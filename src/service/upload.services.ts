import { uploadMultipleImages } from "../config/cloudinary.config";

export const uploadImages = async (menuData: any, files?: Express.Multer.File[]) => {
    if (files && files.length > 0) {
        try {
            const uploadedImageUrls: any = await uploadMultipleImages(files, 'restom-menu-images');

            menuData.images = Array.isArray(menuData.images)
                ? [...menuData.images, ...uploadedImageUrls]
                : uploadedImageUrls;

        } catch (error: any) {
            console.error('Image upload failed:', error);
            // throw new Error('Failed to upload images');
            menuData.images = [];
        }
    }
}