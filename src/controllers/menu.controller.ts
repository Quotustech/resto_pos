import { Request, Response } from "express";
import * as menuService from "../service/menu.services";
import mongoose from "mongoose";

export const createMenu = async (req: Request, res: Response) => {
    try {
        const menu = await menuService.createMenu(req.body);
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

export const updateMenu = async (req: Request, res: Response) => {
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

export const deleteMenu = async (req: Request, res: Response) => {
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
