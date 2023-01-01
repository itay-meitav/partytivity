import express from 'express'
import { partyValidation } from '../../middleware/validations/party.validation'
import {
    newPartyController,
    servicesListController,
} from '../../controllers/dashboard/newParty.controller'
import { authenticationMiddle } from '../../middleware/auth.middleware'
const router = express.Router()

router.post('/', [authenticationMiddle, partyValidation], newPartyController)
router.post('/services', servicesListController)

export default router
