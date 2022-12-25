import express from 'express'
import { authenticationController } from '../controllers/auth.controller'
const router = express.Router()

router.get('/confirm/:token', authenticationController)

export default router
