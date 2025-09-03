import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import config from "../config/config.js";

cloudinary.config({ 
    cloud_name: config.CLOUDINARY_CLOUD_NAME, 
    api_key: config.CLOUDINARY_API_KEY, 
    api_secret: config.CLOUDINARY_API_SECRET 
});
  
const uploadOnCloudinary = async (localFilePath, category) => {
    try {
        if (!localFilePath) {
            throw new Error('No file path provided');
        }

        if (!category) {
            throw new Error('No category/folder name provided');
        }
        const folderPath = category.trim().toLowerCase();
        
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto",
            folder: folderPath,  
            use_filename: true,  
            unique_filename: true 
        });

        fs.unlinkSync(localFilePath);
        return response;
        
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error.message);
        if (fs.existsSync(localFilePath)) {
            fs.unlinkSync(localFilePath);
        }
        throw error;
    }
};
  
export { uploadOnCloudinary };