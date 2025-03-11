import axios, { AxiosRequestConfig } from "axios";
import { config } from "../config";

/**
 * Generic function to send a webhook with a given HTTP method and data.
 * @param method HTTP method: "post", "patch", or "delete"
 * @param url The target webhook URL
 * @param data Payload including channelId and action ("create", "update", or "delete")
 */
const sendWebhook = async (
    method: "post" | "patch" | "delete" | "put",
    url: string,
    data: any
): Promise<void> => {
    try {
        const options: AxiosRequestConfig = {
            method,
            url,
            data,
            headers: { "Content-Type": "application/json" }
        };

        const response = await axios.request(options);

        if (response.status !== 200) {
            console.error(`Webhook responded with status: ${response.status}`);
        } else {
            console.log("Webhook sent successfully");
        }
    } catch (error: any) {
        console.error("Error sending webhook:", error.message);
        // Swallow the error to prevent crashing the application
    }
};

export const sendNewMenuWebHook = async (menuData: any): Promise<void> => {
    await sendWebhook("post", config.RESTOMINDER_MENU_WEBHOOK_URL as string, menuData);
};

export const sendUpdatedMenuWebHook = async (menuData: any): Promise<void> => {
    await sendWebhook("post", config.RESTOMINDER_MENU_WEBHOOK_URL as string, menuData);
};

export const sendDeletedMenuWebHook = async (menuData: any): Promise<void> => {
    await sendWebhook("post", config.RESTOMINDER_MENU_WEBHOOK_URL as string, menuData);
};

export const sendUpdatedOrderStatusToRestominder = async (orderData: any): Promise<void> => {
    await sendWebhook("put", config.RESTOMINDER_ORDER_WEBHOOK_URL as string, orderData);
}