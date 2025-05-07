import { uploadMultipleImages } from "../config/cloudinary.config";

export const uploadImages = async (menuData: any, files?: Express.Multer.File[]) => {
    if (files && files.length > 0) {
        try {
            const uploadedImageUrls: any = await uploadMultipleImages(files, 'restom-menu-images');

            // If menu already has images array
            menuData.images = Array.isArray(menuData.images)
                ? [...menuData.images, ...uploadedImageUrls]
                : uploadedImageUrls;

        } catch (error: any) {
            console.error('Error processing menu images:', error);
            menuData.images = [];
        }
    }
}