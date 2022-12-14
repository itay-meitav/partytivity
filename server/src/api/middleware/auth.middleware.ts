import { Request, Response, NextFunction } from 'express'
import envConfig from '../config/environment.config'
import jwt from 'jsonwebtoken'

export async function authenticationMiddle(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const cookie = req.cookies.token
    if (cookie) {
        try {
            jwt.verify(cookie, envConfig.JWT_SECRET)
            return next()
        } catch (error) {
            return res.status(401).json({
                success: false,
                message: 'You are not authorized to do that',
            })
        }
    }
    return res.status(401).json({
        success: false,
        message: 'You are not authorized to do that',
    })
}
