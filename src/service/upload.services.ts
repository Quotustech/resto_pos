import { uploadMultipleImages } from "../config/cloudinary.config";

export const uploadImages = async (menuData: any, files?: Express.Multer.File[]) => {
    if (files && files.length > 0) {
        try {
            const uploadedImageUrls: any = await uploadMultipleImages(files, 'restom-menu-images');
            console.log("Uploaded image URLs:", uploadedImageUrls);

            // If menu already has images array
            if (Array.isArray(menuData?.images)) {
                menuData.images = [...menuData.images, ...uploadedImageUrls];
            } else {
                menuData.images = uploadedImageUrls;
            }

            console.log(`${files.length} image(s) uploaded successfully.`);
        } catch (error: any) {
            console.error('Error processing menu images:', error);
            // Continue without the images if upload fails
        }
    }
}