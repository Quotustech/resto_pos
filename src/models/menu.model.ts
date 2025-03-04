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
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: "Store" },
  },
  { timestamps: true }
);

const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;




// const MenuSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   description: { type: String },
//   menuItems: [{ type: mongoose.Schema.Types.ObjectId, ref: "MenuItem" }],
//   comboMeals: [{ type: mongoose.Schema.Types.ObjectId, ref: "ComboMeal" }],
//   condiments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Condiment" }],  // <-- Add this
//   condimentGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "CondimentGroup" }],
//   familyGroups: [{ type: mongoose.Schema.Types.ObjectId, ref: "FamilyGroup" }]
// });