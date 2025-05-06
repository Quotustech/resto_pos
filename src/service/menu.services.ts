import { isValidObjectId } from "mongoose";
import * as menuRepository from "../repository/menu.repository";
import * as webhookService from "../service/webhook.services";
import { uploadMultipleImages } from "../config/cloudinary.config";
import { validateMenuRequest } from "../validator/validate";
import { uploadImages } from "./upload.services";
import { generatePayloadForWebhook } from "../utils/generatePayload";

// Create a new menu item with validations and webhook trigger
export const createMenu = async (menuData: any, files?: Express.Multer.File[]) => {
    // Validate request data
    validateMenuRequest(menuData);

    // Upload menu images
    await uploadImages(menuData, files);

    // Ensure default values for optional fields
    const dataToSave = {
        ...menuData,
        available: menuData.available !== undefined ? menuData.available : true,
        images: menuData.images || [],
        tags: menuData.tags || []
    };

    // Create menu item in the database
    const newMenu = await menuRepository.createMenu(dataToSave);

    const webhookData = generatePayloadForWebhook(newMenu, menuData.storeId, menuData.channelId, "create");
    webhookService.sendNewMenuWebHook(webhookData);

    return newMenu;
};

// Update an existing menu item with validations and webhook trigger
export const updateMenu = async (id: string, updateData: any) => {
    // If storeId is provided, validate its format (and do not update it)
    // if (updateData.storeId && !isValidObjectId(updateData.storeId)) {
    //     throw { status: 400, message: "Invalid storeId format" };
    // }
    if (updateData.storeId) {
        delete updateData.storeId;
    }

    const updatedMenu = await menuRepository.updateMenu(id, updateData);
    if (!updatedMenu) {
        throw { status: 404, message: "Menu item not found" };
    }

    // Prepare and send webhook
    const webhookData = generatePayloadForWebhook(updatedMenu, updateData.storeId, updateData.channelId, "update");
    webhookService.sendUpdatedMenuWebHook(webhookData);

    return updatedMenu;
};

// Delete a menu item and trigger a webhook notification
export const deleteMenu = async (id: string, channelId: string) => {
    const deletedMenu = await menuRepository.deleteMenu(id);
    if (!deletedMenu) {
        throw { status: 404, message: "Menu item not found" };
    }

    // Prepare and send webhook
    const webhookData: any = {
        menu: {
            posMenuId: deletedMenu._id,
            storeId: deletedMenu.storeId,
        },
        channelId: channelId,
        action: "delete"
    };
    webhookService.sendDeletedMenuWebHook(webhookData);

    return deletedMenu;
};


// Get all menu items by store ID
export const getAllMenus = async (storeId: number) => {
    const menus = await menuRepository.findMenusByStoreId(storeId);
    return menus;
};
