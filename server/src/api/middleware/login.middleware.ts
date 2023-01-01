import { Request, Response, NextFunction } from 'express'
import envConfig from '../config/environment.config'
import jwt from 'jsonwebtoken'
import { checkIfUserExist } from '../../database/users'
import { sendConfirmationEmail } from '../config/nodemailer.config'

export async function loginMiddle(
    req: Request,
    res: Response,
    next: NextFunction,
    resetUsername?: string
) {
    const location = req.body.location
    const username = req.body.username ? req.body.username : resetUsername
    const cookie = req.cookies.verify
    const checkUser = await checkIfUserExist(username)
    if (checkUser) {
        if (checkUser.status == 'active') {
            return next()
        } else if (!cookie) {
            const token = jwt.sign(
                { email: checkUser.email },
                envConfig.JWT_SECRET,
                {
                    expiresIn: '24h',
                }
            )
            await sendConfirmationEmail(checkUser.email, token, location)
            return res
                .cookie(
                    'verify',
                    jwt.sign({ name: checkUser.name }, envConfig.JWT_SECRET, {
                        expiresIn: '10m',
                    }),
                    {
                        expires: new Date(Date.now() + 1000 * 60 * 10),
                        httpOnly: true,
                        sameSite: 'none',
                        secure: true,
                    }
                )
                .status(401)
                .json({
                    message: 'Please complete the email verification process',
                    success: false,
                })
        }
        return res.status(401).json({
            message: 'Please complete the email verification process',
            success: false,
        })
    }
    return res.status(401).json({
        message: 'The username entered is incorrect',
        success: false,
    })
}
