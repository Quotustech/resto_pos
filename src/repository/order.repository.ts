import Order from "../models/order.model";

export const createOrder = async (orderData: any) => {
    return await Order.create(orderData);
}

export const updateOrder = async (orderId: string, orderData: any) => {
    return await Order.findOneAndUpdate({orderId}, { $set: orderData }, { new: true });
}
