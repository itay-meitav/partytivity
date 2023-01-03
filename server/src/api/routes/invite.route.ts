import express from 'express'
import {
    addGuestController,
    PartyExistenceController,
} from '../controllers/invite.controller'
import {
    inviteValidation,
    partyTokenValidation,
} from '../middleware/validations/invite.validation'
const router = express.Router()

router.get('/:partyToken', partyTokenValidation, PartyExistenceController)
router.post('/', inviteValidation, addGuestController)

export default router
