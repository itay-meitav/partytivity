import envConfig from '../config/environment.config'
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
    cloud_name: envConfig.CLOUDINARY_NAME,
    api_key: envConfig.CLOUDINARY_API_KEY,
    api_secret: envConfig.CLOUDINARY_SECRET,
})
