import mongoose from "mongoose";
const { Schema, model, Types } = mongoose;

const OrderSchema = new Schema(
    {
        registration: { type: String, required: true },
        storeId: { type: Number, required: true },
        orderId: { type: String, required: true, unique: true },
        menuId: [{ type: Types.ObjectId, ref: "MenuWebhook", required: true }],

        // order details
        orderStatus: {
            type: String,
            enum: ["pending", "accept", "reject"],
            default: "pending"
        },
        totalAmount: { type: Number, required: true },
        quantity: { type: Number, required: true },
        pickUpTime: { type: Date, required: true },

        // customer details
        customerDetails: {
            name: { type: String, required: true, maxlength: 100 },
            phone: { type: String, required: true, maxlength: 20 },
            email: { type: String, maxlength: 100 }
        },
    },
    { timestamps: true }
);

const Order = model("Order", OrderSchema);
export default Order;
