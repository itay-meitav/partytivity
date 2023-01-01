import express from 'express'
import {
    userPartiesController,
    partyDetailsController,
} from '../../controllers/dashboard/myParties.controller'
import { authenticationMiddle } from '../../middleware/auth.middleware'
import newParty from './newParty.route'
const router = express.Router()

router.use('/new', newParty)
router.get('/', authenticationMiddle, userPartiesController)
router.get('/:partyTitle', authenticationMiddle, partyDetailsController)

export default router
