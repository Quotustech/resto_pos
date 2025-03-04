import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ApiKeySchema = new Schema(
    {
        storeId: { type: Schema.Types.ObjectId, ref: "Store" },
        applicationName: { type: String, required: true },
        apiKey: { type: String, required: true, unique: true },
        apiSecret: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export default model("ApiKey", ApiKeySchema);
