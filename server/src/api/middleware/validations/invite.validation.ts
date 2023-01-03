import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import authConfig from '../../config/environment.config'

import { z } from 'zod'

export function partyTokenValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const { id } = jwt.verify(
            req.params.partyToken,
            authConfig.JWT_SECRET
        ) as JwtPayload
        return next()
    } catch (error) {
        return res
            .status(404)
            .json({ message: 'Invalid party token', success: false })
    }
}

export function inviteValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const guestDetails = {
        name: req.body.name,
        phone: req.body.phone,
        isComing: req.body.isComing,
        comment: req.body.comment,
    }
    const guestDetailsSchema = z.object({
        name: z.string().regex(/^[a-zA-Z]*$/g),
        phone: z.number().min(5).max(11),
        isComing: z.enum(['yes', 'maybe']),
        comment: z.string().max(200).optional(),
    })
    const results = guestDetailsSchema.safeParse(guestDetails)
    if (!results.success) {
        return res.status(400).json({
            success: false,
            message: "The details entered don't match the system requirements",
        })
    }
    return next()
}
