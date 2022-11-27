import envConfig from "../config/environment.config";
export const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: envConfig.photos.CLOUDINARY_NAME,
  api_key: envConfig.photos.CLOUDINARY_API_KEY,
  api_secret: envConfig.photos.CLOUDINARY_SECRET,
});
