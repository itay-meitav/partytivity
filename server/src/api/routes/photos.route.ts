import express from 'express'
import { authenticationMiddle } from '../middleware/auth.middleware'
import {
    removePhotoController,
    uploadPhotoController,
} from '../controllers/photos.controller'

const router = express.Router()
// router.use("/photos", express.static(__dirname + "/photos/"));
router.post('/', authenticationMiddle, uploadPhotoController)
router.post('/remove', authenticationMiddle, removePhotoController)

export default router
