import mongoose from "mongoose";
const { Schema, Types, model } = mongoose;

const OrderSchema = new Schema(
    {
        registration: { type: String, required: true },
        storeId: { type: Number, required: true, index: true },
        orderId: { type: String, required: true, unique: true },

        // Updated order details field:
        orderDetails: [
            {
                menuId: { type: Types.ObjectId, ref: "Menu", required: true },
                price: { type: Number, required: true },
                quantity: { type: Number, required: true }
            }
        ],

        // order status and summary details
        orderStatus: {
            type: String,
            enum: ["pending", "accept", "reject", "preparing", "ready", "dispatched"],
            default: "pending"
        },
        totalAmount: { type: Number, required: true },
        pickUpTime: { type: Date, required: true },

        // customer details
        customerDetails: {
            name: { type: String, required: true, maxlength: 100 },
            phone: { type: String, required: true, maxlength: 20 },
            email: { type: String, maxlength: 100 }
        }
    },
    { timestamps: true }
);

const Order = model("Order", OrderSchema);
export default Order;
