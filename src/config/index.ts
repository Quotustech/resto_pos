import dotenv from "dotenv";
dotenv.config();

const env = process.env;

export const config = {
    PORT: env.PORT,
    JWT_SECRET: env.JWT_SECRET,
    DATABASE_URL: env.DATABASE_URL,
    RESTOMINDER_MENU_WEBHOOK_URL: env.RESTOMINDER_MENU_WEBHOOK_URL,
    RESTOMINDER_ORDER_WEBHOOK_URL: env.RESTOMINDER_ORDER_WEBHOOK_URL,

    // cloudinary
    cloudinary: {
        cloudName: env.CLOUDINARY_CLOUD_NAME,
        apiKey: env.CLOUDINARY_API_KEY,
        apiSecret: env.CLOUDINARY_API_SECRET,
        folder: env.CLOUDINARY_FOLDER,
        maxFileSize: env.CLOUDINARY_MAX_FILE_SIZE,
        allowedFileTypes: env.ALLOWED_IMAGE_FORMATS?.split(",")
    }
}