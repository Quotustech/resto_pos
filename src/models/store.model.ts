import mongoose from "mongoose";

const StoreSchema = new mongoose.Schema(
    {
        name: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true }, // Hash this before storing
        phone: { type: String },
        address: { type: String },
    },
    { timestamps: true }
);

export const Store = mongoose.model("Store", StoreSchema);
