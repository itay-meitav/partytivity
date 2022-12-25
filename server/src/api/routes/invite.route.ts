import express from 'express'
import {
    addGuestController,
    PartyExistenceController,
} from '../controllers/invite.controller'
const router = express.Router()

router.post('/', PartyExistenceController)
router.post('/guest', addGuestController)

export default router
