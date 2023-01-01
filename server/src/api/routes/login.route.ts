import express from 'express'
import {
    changePasswordController,
    checkResetTokenController,
    loginController,
    logoutController,
    sendResetController,
} from '../controllers/login.controller'
import { loginMiddle } from '../middleware/login.middleware'
import { resetMiddle } from '../middleware/reset.middleware'
import { loginValidation } from '../middleware/validations/login.validation'
import { resetValidation } from '../middleware/validations/reset.validation'
const router = express.Router()

router.post('/', [loginValidation, loginMiddle], loginController)
router.post('/reset', [resetValidation, resetMiddle], sendResetController)
router
    .route('/reset/new/:token')
    .get(checkResetTokenController)
    .post(changePasswordController)
router.get('/logout', logoutController)

export default router
