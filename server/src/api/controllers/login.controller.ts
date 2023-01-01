import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import {
    changeUserPass,
    checkIfUserExist,
    checkUserEmail,
} from '../../database/users'
import { sendResetEmail } from '../config/nodemailer.config'
import envConfig from '../config/environment.config'

export async function loginController(req: Request, res: Response) {
    const { username, password } = req.body
    const userData = await checkIfUserExist(username)
    try {
        await bcryptjs.compare(password, userData.password)
        const token = jwt.sign({ id: userData.id }, envConfig.JWT_SECRET, {
            expiresIn: '24h',
        })
        return res
            .cookie('token', token, {
                expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
                httpOnly: true,
                sameSite: 'none',
                secure: true,
            })
            .json({
                success: true,
            })
    } catch (error) {
        return res.status(401).json({
            message: 'The password entered is incorrect',
            success: false,
        })
    }
}

export async function sendResetController(req: Request, res: Response) {
    const { email, location } = req.body
    const cookie = req.cookies.reset
    const checkUser = await checkUserEmail(email)
    if (!cookie) {
        const token = jwt.sign(
            { email: checkUser.email },
            envConfig.JWT_SECRET,
            {
                expiresIn: '10m',
            }
        )
        await sendResetEmail(email, token, location)
        return res
            .cookie(
                'reset',
                jwt.sign({ id: checkUser.id }, envConfig.JWT_SECRET, {
                    expiresIn: '10m',
                }),
                {
                    expires: new Date(Date.now() + 1000 * 60 * 10),
                    httpOnly: true,
                    sameSite: 'none',
                    secure: true,
                }
            )
            .json({
                message: 'Please check your email',
                success: true,
            })
    }
    return res.status(401).json({
        message: 'A reset link has already been sent to this email',
        success: false,
    })
}

export async function checkResetTokenController(req: Request, res: Response) {
    const token = req.params.token
    const cookie = req.cookies.reset
    if (token && cookie) {
        try {
            jwt.verify(token, envConfig.JWT_SECRET)
            return res.json({
                success: true,
            })
        } catch (error) {
            return res
                .status(401)
                .json({ message: 'Unauthorized!', success: false })
        }
    }
    return res.status(404).json({
        message: 'Unauthorized!',
        success: false,
    })
}

export async function changePasswordController(req: Request, res: Response) {
    const token = req.params.token
    const password = req.body.password
    const cookie = req.cookies.reset
    if (cookie) {
        try {
            const { email } = jwt.verify(
                token,
                envConfig.JWT_SECRET
            ) as JwtPayload
            if (password) {
                const hashedPassword = await bcryptjs.hash(password, 12)
                await changeUserPass({
                    email: email,
                    password: hashedPassword,
                })
                return res
                    .clearCookie('reset')
                    .json({ message: 'Password changed', success: true })
            } else {
                return res.status(401).json({
                    message: 'make sure to send all the necessary fields',
                    success: false,
                })
            }
        } catch (error) {
            return res
                .status(401)
                .json({ message: 'Unauthorized!', success: false })
        }
    }
    return res.status(401).json({ message: 'Unauthorized!', success: false })
}

export async function logoutController(req: Request, res: Response) {
    return res.clearCookie('token').json({ success: true })
}
