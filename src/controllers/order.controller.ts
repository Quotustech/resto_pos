import { Request, Response } from "express";
import * as orderService from "../service/order.services";

export const createOrderController = async (req: Request, res: Response) => {
    try {
        const order = await orderService.createOrderService(req.body);
        return res.status(201).json(order);
    } catch (error: any) {
        console.error("Error creating order:", error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
};

export const updateOrderController = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;
        const updateData = req.body;

        if (!orderId) {
            return res.status(400).json({ message: "Order ID is required" });
        }
        if (!updateData || Object.keys(updateData).length === 0) {
            return res.status(400).json({ success: false, message: "Update data is required" });
        }

        const updatedOrder = await orderService.updateOrderService(orderId as string, updateData);
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: "Order not found" });
        }

        return res.status(200).json({ 
            success: true,
            message: "Order updated successfully", 
            order: updatedOrder 
        });
    } 
    catch (error: any) {
        console.error("Error updating order:", error.message);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
};

export const getOrdersSummaryService = async (req: Request, res: Response) => {
    try {
        const { storeId } = req.body;
        const orders = await orderService.getOrdersSummaryService(+storeId);
        res.status(200).json({ data: orders });
    } catch (error: any) {
        console.error("Error getting orders:", error.message);
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
};
