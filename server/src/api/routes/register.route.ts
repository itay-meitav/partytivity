import express from 'express'
import { registerController } from '../controllers/register.controller'
import { registerValidation } from '../middleware/validations/register.validation'
const router = express.Router()

router.post('/', registerValidation, registerController)

export default router
