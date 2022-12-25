import express from 'express'
import {
    changePasswordController,
    checkResetTokenController,
    loginController,
    logoutController,
    sendResetController,
} from '../controllers/login.controller'
const router = express.Router()

router.post('/', loginController)
router.post('/reset', sendResetController)
router
    .route('/reset/new/:token')
    .get(checkResetTokenController)
    .post(changePasswordController)
router.get('/logout', logoutController)

export default router
