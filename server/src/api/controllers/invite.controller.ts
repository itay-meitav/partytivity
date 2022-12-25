import { Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import {
    addGuestToParty,
    getPartyDetailsByID,
} from '../../database/dashboard/partyInvite'
import authConfig from '../config/environment.config'

export async function PartyExistenceController(req: Request, res: Response) {
    try {
        const { id } = jwt.verify(
            req.body.partyToken,
            authConfig.JWT_SECRET
        ) as JwtPayload
        const partyDetails = await getPartyDetailsByID(id)
        return res.json({
            partyDetails: partyDetails,
            success: true,
        })
    } catch (err) {
        return res
            .status(404)
            .json({ message: 'There is no party with that ID', success: false })
    }
}

export async function addGuestController(req: Request, res: Response) {
    try {
        const { id } = jwt.verify(
            req.body.partyToken,
            authConfig.JWT_SECRET
        ) as JwtPayload
        await addGuestToParty({
            partyID: id.toString(),
            name: req.body.name,
            phone: req.body.phone,
            isComing: req.body.isComing,
            comment: req.body.comment,
        })
        return res.json({
            success: true,
        })
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            success: false,
        })
    }
}
