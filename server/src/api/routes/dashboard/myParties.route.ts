import express from 'express'
import {
    userPartiesController,
    partyDetailsController,
} from '../../controllers/dashboard/myParties.controller'
import { isAuthenticated } from '../../middleware/auth.middleware'
import newParty from './newParty.route'
const router = express.Router()

router.use('/new', newParty)
router.get('/', isAuthenticated, userPartiesController)
router.get('/:partyTitle', isAuthenticated, partyDetailsController)

export default router
