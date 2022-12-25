import path from 'path'
import multer from 'multer'
import fs from 'fs'
import { v2 as cloudinary } from 'cloudinary'
import { Request, Response } from 'express'

const cloudinaryUploader = async (filePath: string) => {
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

const upload = multer({
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

export const uploadPhoto = async (req: Request, res: Response) => {
    upload(req, res, async (err) => {
        let uploadsLinksArr: string[] = []
        let uploadsNamesArr: string[] = []
        if (err) {
            if (err.name == 'LIMIT_FILE_TYPES') {
                return res.status(422).json({
                    massage: 'Only images are allowed',
                    success: false,
                })
            } else if (err.code == 'LIMIT_FILE_SIZE') {
                return res.status(422).json({
                    massage: `Too large. Max size is ${5000000 / 1000}KB`,
                    success: false,
                })
            } else if (err.code == 'LIMIT_UNEXPECTED_FILE') {
                return res.status(422).json({
                    massage: `You can upload up to 4 images only`,
                    success: false,
                })
            } else {
                return res.status(501).json({
                    massage: err,
                    success: false,
                })
            }
        }
        const files = req.files as Express.Multer.File[]
        const cloudUpload = files.map((file) => {
            cloudinaryUploader(file.path)
                .then((res: any) => {
                    uploadsNamesArr.push(res.public_id)
                    uploadsLinksArr.push(res.url)
                })
                .catch((err: Error) => console.log(err.message))
        })
        await Promise.all(cloudUpload)
        return res.json({
            message: 'Files Uploaded!',
            files: uploadsLinksArr,
            names: uploadsNamesArr,
            // files: req.files,
            success: true,
        })
    })
}

export const removePhoto = async (req: Request, res: Response) => {
    if (req.body.photos) {
        try {
            cloudinary.api.delete_resources(req.body.photos)
            return res.json({
                success: true,
            })
        } catch (err) {
            console.log((err as Error).message)
            return res.status(500).json({
                success: false,
            })
        }
    }
    return res.status(500).json({
        success: false,
    })
}
