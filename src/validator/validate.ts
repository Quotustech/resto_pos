export const validateMenuRequest = (menuData: any) => {
    const { name, price, minPrepTime, maxPrepTime, maxPossibleOrders, storeId } = menuData;

    // Validate required fields
    if (!name || price === undefined || minPrepTime === undefined || maxPrepTime === undefined || maxPossibleOrders === undefined || !storeId) {
        throw { status: 400, message: "Required fields missing. Please provide name, price, minPrepTime, maxPrepTime, maxPossibleOrders, and storeId" };
    }

    // Business validations
    if (minPrepTime > maxPrepTime) {
        throw { status: 400, message: "Minimum preparation time cannot be greater than maximum preparation time" };
    }
    if (price < 0 || maxPossibleOrders < 0) {
        throw { status: 400, message: "Price and maxPossibleOrders must be positive numbers" };
    }
}