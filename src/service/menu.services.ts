import { isValidObjectId } from "mongoose";
import * as menuRepository from "../repository/menu.repository";
import * as webhookService from "../service/webhook.services";

// Create a new menu item with validations and webhook trigger
export const createMenu = async (menuData: any) => {
    const { name, price, minPrepTime, maxPrepTime, maxPossibleOrders, storeId } = menuData;

    // Validate required fields
    if (!name || price === undefined || minPrepTime === undefined || maxPrepTime === undefined || maxPossibleOrders === undefined || !storeId) {
        throw { status: 400, message: "Required fields missing. Please provide name, price, minPrepTime, maxPrepTime, maxPossibleOrders, and storeId" };
    }

    // Business validations
    if (minPrepTime > maxPrepTime) {
        throw { status: 400, message: "Minimum preparation time cannot be greater than maximum preparation time" };
    }
    if (price < 0 || maxPossibleOrders < 0) {
        throw { status: 400, message: "Price and maxPossibleOrders must be positive numbers" };
    }

    // Ensure default values for optional fields
    const dataToSave = {
        ...menuData,
        available: menuData.available !== undefined ? menuData.available : true,
        images: menuData.images || [],
        tags: menuData.tags || []
    };

    // Create menu item in the database
    const newMenu = await menuRepository.createMenu(dataToSave);

    // Prepare and send webhook
    const webhookData: any = {
        menu: {
            posMenuId: newMenu._id,
            name: newMenu.name,
            description: newMenu.description,
            price: newMenu.price,
            minPrepTime: newMenu.minPrepTime,
            maxPrepTime: newMenu.maxPrepTime,
            maxPossibleOrders: newMenu.maxPossibleOrders,
            available: newMenu.available,
            images: newMenu.images,
            tags: newMenu.tags,
            category: newMenu.category,
            storeId: storeId,
        },
        channelId: menuData.channelId,
        action: "create"
    };
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
    const webhookData: any = {
        menu: {
            posMenuId: updatedMenu._id,
            name: updatedMenu.name,
            description: updatedMenu.description,
            price: updatedMenu.price,
            minPrepTime: updatedMenu.minPrepTime,
            maxPrepTime: updatedMenu.maxPrepTime,
            maxPossibleOrders: updatedMenu.maxPossibleOrders,
            available: updatedMenu.available,
            images: updatedMenu.images,
            tags: updatedMenu.tags,
            category: updatedMenu.category,
            storeId: updatedMenu.storeId,
        },
        channelId: updateData.channelId,
        action: "update"
    };
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
    if (!menus || menus.length === 0) {
        throw { status: 404, message: "Menus not found" };
    }
    return menus;
};
