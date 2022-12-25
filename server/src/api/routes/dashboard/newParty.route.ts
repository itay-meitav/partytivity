import express from 'express'
import {
    newPartyController,
    servicesListController,
} from '../../controllers/dashboard/newParty.controller'
import { isAuthenticated } from '../../middleware/auth.middleware'
const router = express.Router()

router.post('/', isAuthenticated, newPartyController)
router.post('/services', servicesListController)

export default router
