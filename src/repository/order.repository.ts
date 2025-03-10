import Order from "../models/order.model";

export const createOrder = async (orderData: any) => {
    return await Order.create(orderData);
}

export const updateOrder = async (orderId: string, orderData: any) => {
    const result = await Order.findOneAndUpdate({ orderId }, { $set: orderData }, { new: true, lean: true });
    return result;
}


export const getAllOrdersOfStore = async (storeId: number) => {
    return await Order.find({ storeId })
        .populate("orderDetails.menuId", "name") // Populate menu name
        .select("storeId orderId orderDetails orderStatus totalAmount pickUpTime customerDetails")
        .lean()
}



// // repositories/orderRepository.js
// export const getOrdersSummaryRepository = async () => {
//     const orders = await Order.aggregate([
//         // Unwind orderDetails to join each element with Menu
//         {
//             $unwind: {
//                 path: "$orderDetails",
//                 preserveNullAndEmptyArrays: true,
//             },
//         },
//         // Lookup menu details based on orderDetails.menuId matching Menu.posMenuId
//         {
//             $lookup: {
//                 from: "menus", // collection name for Menu documents
//                 localField: "orderDetails.menuId",
//                 foreignField: "posMenuId",
//                 as: "menuDetails",
//             },
//         },
//         // Unwind the resulting array from lookup (if available)
//         {
//             $unwind: {
//                 path: "$menuDetails",
//                 preserveNullAndEmptyArrays: true,
//             },
//         },
//         // Project only the required fields from Order and Menu
//         {
//             $project: {
//                 orderId: 1,
//                 storeId: 1,
//                 orderStatus: 1,
//                 totalAmount: 1,
//                 pickUpTime: 1,
//                 "orderDetails.price": 1,
//                 "orderDetails.quantity": 1,
//                 "menuDetails.name": 1,
//             },
//         },
//         // Group back the orderDetails array per order
//         {
//             $group: {
//                 _id: "$_id",
//                 orderId: { $first: "$orderId" },
//                 storeId: { $first: "$storeId" },
//                 orderStatus: { $first: "$orderStatus" },
//                 totalAmount: { $first: "$totalAmount" },
//                 pickUpTime: { $first: "$pickUpTime" },
//                 orderDetails: {
//                     $push: {
//                         menuName: "$menuDetails.name",
//                         price: "$orderDetails.price",
//                         quantity: "$orderDetails.quantity",
//                     },
//                 },
//             },
//         },
//         // Exclude the internal _id field
//         {
//             $project: {
//                 _id: 0,
//                 orderId: 1,
//                 storeId: 1,
//                 orderStatus: 1,
//                 totalAmount: 1,
//                 pickUpTime: 1,
//                 orderDetails: 1,
//             },
//         },
//     ]);

//     return orders;
// };
