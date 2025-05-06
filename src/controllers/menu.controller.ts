import { Request, Response } from "express";
import * as menuService from "../service/menu.services";
import mongoose from "mongoose";

export const createMenuController = async (req: Request, res: Response) => {
    try {
        // Extract files from request
        const files = req.files as Express.Multer.File[] | undefined;

        const menu = await menuService.createMenu(req.body, files);

        return res.status(201).json({
            message: "Menu item created successfully",
            menu
        });
    } catch (error: any) {
        console.error("Error creating menu item:", error.message);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                message: "Validation error",
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const updateMenuController = async (req: Request, res: Response) => {
    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ message: "No update data provided" });
        }
        const { id } = req.params;
        const updatedMenu = await menuService.updateMenu(id, req.body);
        return res.status(200).json({
            message: "Menu item updated successfully",
            menu: updatedMenu
        });
    } catch (error: any) {
        console.error("Error updating menu item:", error.message);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                message: "Validation error",
                errors: Object.values(error.errors).map(err => err.message)
            });
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

export const deleteMenuController = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { channelId } = req.body;
        const deletedMenu = await menuService.deleteMenu(id, channelId);
        return res.status(200).json({
            message: "Menu item deleted successfully",
            menu: deletedMenu
        });
    } catch (error: any) {
        console.error("Error deleting menu item:", error.message);
        if (error.status) {
            return res.status(error.status).json({ message: error.message });
        }
        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};


export const getAllMenuController = async (req: Request, res: Response) => {
    try {
        const storeId = req.body.storeId;
        if (!storeId) {
            throw { status: 400, message: "storeId is required" };
        }
        const menus = await menuService.getAllMenus(+storeId);

        if (!menus || menus.length === 0) {
            return res.status(201).json({ success: true, message: "No menus found", menus: [] });
        }

        return res.status(200).json({ success: true, message: "Menus found successfully", menus });
    } catch (error: any) {
        console.error("Error getting menus:", error.message);
        res.status(error.status || 500).json({ error: error.message });
    }
};