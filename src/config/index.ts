import dotenv from "dotenv";

dotenv.config();  

export const config = {
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    DATABASE_URL: process.env.DATABASE_URL,
    RESTOMINDER_MENU_WEBHOOK_URL: process.env.RESTOMINDER_MENU_WEBHOOK_URL,
    RESTOMINDER_ORDER_WEBHOOK_URL: process.env.RESTOMINDER_ORDER_WEBHOOK_URL,
}