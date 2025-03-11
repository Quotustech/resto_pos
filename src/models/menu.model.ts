import mongoose from "mongoose";

const MenuSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    minPrepTime: { type: Number, required: true },
    maxPrepTime: { type: Number, required: true },
    maxPossibleOrders: { type: Number, required: true },
    available: { type: Boolean, default: true },
    images: [{ type: String }],
    tags: [{ type: String }],
    category: { type: String },
    dietary: { type: String },
    storeId: { type: Number, required: true },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;
