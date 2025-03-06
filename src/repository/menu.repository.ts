import Menu from "../models/menu.model";

// Create a new menu item
export const createMenu = async (menuData: any) => {
    const menu = new Menu(menuData);
    return await menu.save();
};

// Update an existing menu item by ID
export const updateMenu = async (id: string, updateData: any) => {
    return await Menu.findByIdAndUpdate(id, { $set: updateData }, { new: true, runValidators: true });
};

// Delete a menu item by ID
export const deleteMenu = async (id: string) => {
    return await Menu.findByIdAndDelete(id);
};

// Get all menu items by store ID
export const findMenusByStoreId = async (storeId: number) => {
    return await Menu.find({ storeId });
};