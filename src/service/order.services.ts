import * as orderRepository from '../repository/order.repository';
import { sendUpdatedOrderStatusToRestominder } from './webhook.services';

export const createOrderService = async (orderData: any) => {
    return await orderRepository.createOrder(orderData);
}

export const updateOrderService = async (orderId: string, orderData: any) => {
    const updatedOrder: any = await orderRepository.updateOrder(orderId, orderData);

    let updatedOrderData = {
        orderId: updatedOrder.orderId,
        orderStatus: updatedOrder.orderStatus
    };
    // send the updated order to restominder
    sendUpdatedOrderStatusToRestominder(updatedOrderData);

    return updatedOrder;
}

export const getOrdersSummaryService = async (storeId: number) => {
    return await orderRepository.getAllOrdersOfStore(storeId);
};