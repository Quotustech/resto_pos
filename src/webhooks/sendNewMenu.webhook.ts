import axios from "axios";
import { config } from "../config";

export const sendNewMenuWebHook = async (menuData: any) => {
    try {
        const webHookResponse = await axios.post(config.RESTOMINDER_MENU_WEBHOOK_URL as string, menuData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (webHookResponse.status !== 200) {
            throw new Error(`Webhook response status: ${webHookResponse.status}`);
        }
        console.log("Webhook sent successfully");
    } 
    catch (error: any) {
        console.error("Error sending webhook:", error.message);
    }
};

export const sendUpdatedMenuWebHook = async (menuData: any) => {
    try {
        const webHookResponse = await axios.patch(config.RESTOMINDER_MENU_WEBHOOK_URL as string, menuData, {
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (webHookResponse.status !== 200) {
            throw new Error(`Webhook response status: ${webHookResponse.status}`);
        }
        console.log("Webhook sent successfully");
    } 
    catch (error: any) {
        console.error("Error sending webhook:", error.message);
    }
}


// DELETE MENU WEBHOOK
export const sendDeletedMenuWebHook = async (menuData: any) => {
    try {
        const webHookResponse = await axios.delete(config.RESTOMINDER_MENU_WEBHOOK_URL as string, {
            data: menuData,
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (webHookResponse.status !== 200) {
            throw new Error(`Webhook response status: ${webHookResponse.status}`);
        }
        console.log("Webhook sent successfully");
    } 
    catch (error: any) {
        console.error("Error sending webhook:", error.message);
    }
}
