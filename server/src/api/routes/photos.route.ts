import express from 'express'
import { isAuthenticated } from '../middleware/auth.middleware'
import {
    removePhotoController,
    uploadPhotoController,
} from '../controllers/photos.controller'

const router = express.Router()
// router.use("/photos", express.static(__dirname + "/photos/"));
router.post('/', isAuthenticated, uploadPhotoController)
router.post('/remove', isAuthenticated, removePhotoController)

export default router
