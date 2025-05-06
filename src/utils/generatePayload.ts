export const generatePayloadForWebhook = (menu: any, storeId: number, channelId: string, action: string) => {
    return {
        menu: {
            posMenuId: menu._id,
            name: menu.name,
            description: menu.description,
            price: menu.price,
            minPrepTime: menu.minPrepTime,
            maxPrepTime: menu.maxPrepTime,
            maxPossibleOrders: menu.maxPossibleOrders,
            available: menu.available,
            images: menu.images,
            tags: menu.tags,
            dietary: menu.dietary,
            category: menu.category,
            storeId: storeId,
        },
        channelId,
        action
    };
}