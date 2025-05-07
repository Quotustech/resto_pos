import multer from 'multer';
import { Request, Response, NextFunction } from 'express';
import { config } from '../config';

const ALLOWED_FILE_TYPES = config.cloudinary.allowedFileTypes;
const MAX_FILE_SIZE = parseInt(config.cloudinary.maxFileSize!);

if (!ALLOWED_FILE_TYPES || !MAX_FILE_SIZE) {
    throw new Error('Cloudinary configuration is missing allowed file types or max file size');
}

// Use memory storage to avoid saving to disk
const storage = multer.memoryStorage();

export const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    if (!ALLOWED_FILE_TYPES.includes(file.mimetype)) {
        return new Error('Invalid file type. Only JPEG, PNG, and WebP images are allowed.');
    }
    cb(null, true);
};

export const upload = multer({ storage, fileFilter, limits: { fileSize: MAX_FILE_SIZE } });

// Middleware to handle image uploads
// export const uploadImage = upload.any(); // Limit to 5 images
export const uploadImage = upload.array('images', 5); // Limit to 5 images

/**
 * Middleware to handle errors from multer 
 * This middleware should be used after the upload middleware 
 * to catch any errors that occur during the file upload process
 */
export const handleUploadErrors = (err: any, req: Request, res: Response, next: NextFunction) => {    
    if (err instanceof multer.MulterError) {
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json(`File too large. Maximum size is ${MAX_FILE_SIZE / (1024 * 1024)}MB`);
        }
        return res.status(400).json({ message: err.message });
    }
    if (err) {
        return res.status(500).json({ message: "Unknown upload error", error: err.message });
    }
    next(err);
};