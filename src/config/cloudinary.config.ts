import { v2 as cloudinary } from 'cloudinary';
import streamifier from 'streamifier';
import { config } from '.';

export interface CloudinaryUploadResponse {
    public_id: string;
    secure_url: string;
}

export const cloudinaryConfig = cloudinary.config({
    cloud_name: config.cloudinary.cloudName,
    api_key: config.cloudinary.apiKey,
    api_secret: config.cloudinary.apiSecret
});


/**
 * Upload a single image to Cloudinary
 */
export const uploadStream = (fileBbuffer: Buffer, folder: string): Promise<CloudinaryUploadResponse> => {
    return new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
            { folder, resource_type: 'auto' },
            (error, result) => {
                if (error) return reject(error);
                resolve({
                    public_id: result?.public_id as string,
                    secure_url: result?.secure_url as string,
                });
            }
        );

        // Create a readable stream from buffer and pipe to Cloudinary
        const readableStream = streamifier.createReadStream(fileBbuffer);
        readableStream.pipe(uploadStream);
    });
};

/**
 * Upload multiple images to Cloudinary and return array of URLs
 */
export const uploadMultipleImages = async (files: Express.Multer.File[], folder: string): Promise<string[] | undefined> => {
    try {
        const uploadPromises = files.map(file => uploadStream(file.buffer, folder));
        const results = await Promise.all(uploadPromises);

        // Return just the URLs as the schema expects an array of strings
        return results.map(result => result.secure_url);
    } catch (error: any) {
        console.error('Error uploading multiple images:', error);
        throw error.message; // You can customize this error handling as needed
        // throw ApiError.internal('Failed to upload menu images', ERROR_CODES.IMAGE_UPLOAD_FAILED);
    }
};

export const deleteImage = async (publicId: string): Promise<boolean> => {
    try {
        const result = await cloudinary.uploader.destroy(publicId);
        return result.result === 'ok';
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
        return false;
    }
};