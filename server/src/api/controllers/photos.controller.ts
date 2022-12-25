import { v2 as cloudinary } from 'cloudinary'
import { Request, Response } from 'express'
import {
    cloudUploaderValidation,
    uploadPhotoValidation,
} from '../middleware/validations/photos.validation'

export async function uploadPhotoController(req: Request, res: Response) {
    uploadPhotoValidation(req, res, async (err) => {
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
            cloudUploaderValidation(file.path)
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

export function removePhotoController(req: Request, res: Response) {
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
