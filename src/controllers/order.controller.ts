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
        const updatedOrder = await orderService.updateOrderService(orderId as string, req.body);
        console.log("ORDER UPDATED", updatedOrder);
        return res.status(200).json(updatedOrder);
    } catch (error: any) {
        console.error("Error updating order:", error.message);
        return res.status(500).json({ message: "Internal server error" });
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
