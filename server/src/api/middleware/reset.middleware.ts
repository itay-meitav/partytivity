import { Request, Response, NextFunction } from 'express'
import { checkUserEmail } from '../../database/users'
import { loginMiddle } from './login.middleware'

export async function resetMiddle(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const email = req.body.email
    const checkUser = await checkUserEmail(email)
    if (checkUser) {
        return loginMiddle(req, res, next, checkUser.username)
    }
    return res.status(401).json({
        message: 'No user is associated with this email',
        success: false,
    })
}
