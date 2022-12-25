import path from 'path'
import multer from 'multer'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'

export async function cloudUploaderValidation(filePath: string) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            timestamp: new Date().getTime(),
            transformation: { width: 800, height: 400, crop: 'fill' },
        })
        fs.unlinkSync(filePath)
        return result
    } catch (error) {
        console.log((error as Error).message)
        return error
    }
}

const storage = multer.diskStorage({
    destination: './src/api/assets/',
    filename: function (req, file, cb) {
        cb(
            null,
            file.fieldname + '-' + Date.now() + path.extname(file.originalname)
        )
    },
})

export const uploadPhotoValidation = multer({
    storage: storage,
    limits: { fileSize: 5000000 },
    fileFilter: async (req, file, cb) => {
        const filetypes = /jpeg|jpg|png|gif/
        const extname = filetypes.test(
            path.extname(file.originalname).toLowerCase()
        )
        const mimetype = filetypes.test(file.mimetype)
        if (mimetype && extname) {
            return cb(null, true)
        } else {
            const error: any = new Error('Wrong file type!')
            error.name = 'LIMIT_FILE_TYPES'
            cb(error, false)
        }
    },
}).array('files', 4)
