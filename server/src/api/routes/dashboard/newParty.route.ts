import express from 'express'
import { partyValidation } from '../../middleware/validations/party.validation'
import {
    newPartyController,
    servicesListController,
} from '../../controllers/dashboard/newParty.controller'
import { isAuthenticated } from '../../middleware/auth.middleware'
const router = express.Router()

router.post('/', [isAuthenticated, partyValidation], newPartyController)
router.post('/services', servicesListController)

export default router
