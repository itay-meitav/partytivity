import { Request, Response } from 'express'
import bcryptjs from 'bcryptjs'
import jwt, { JwtPayload } from 'jsonwebtoken'
import {
    changeUserPass,
    checkIfUserExist,
    checkUserEmail,
} from '../../database/users'
import {
    sendConfirmationEmail,
    sendResetEmail,
} from '../config/nodemailer.config'
import envConfig from '../config/environment.config'

export const login = async (req: Request, res: Response) => {
    const { username, password, location } = req.body
    const cookie = req.cookies.verify
    const checkUser = await checkIfUserExist(username)
    if (checkUser) {
        if (checkUser.status == 'active') {
            const checkPass = await bcryptjs.compare(
                password,
                checkUser.password
            )
            if (checkPass) {
                const token = jwt.sign(
                    { id: checkUser.id },
                    envConfig.JWT_SECRET,
                    {
                        expiresIn: '24h',
                    }
                )
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
            }
            return res.status(401).json({
                message: 'The password entered is incorrect',
                success: false,
            })
        } else if (!cookie) {
            return await sendVerificationEmail(checkUser, location, res)
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

export const sendReset = async (req: Request, res: Response) => {
    const { email, location } = req.body
    const cookie = req.cookies.verify
    const checkUser = await checkUserEmail(email)
    if (checkUser) {
        if (checkUser.status !== 'active') {
            if (cookie) {
                return res.status(401).json({
                    message: 'Please complete the email verification process',
                    success: false,
                })
            }
            return await sendVerificationEmail(checkUser, location, res)
        }
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
        message: 'No user is associated with this email',
        success: false,
    })
}

export const checkResetToken = async (req: Request, res: Response) => {
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
        success: false,
    })
}

export const changePassword = async (req: Request, res: Response) => {
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

export const logout = async (req: Request, res: Response) => {
    return res.clearCookie('token').json({ success: true })
}

async function sendVerificationEmail(
    checkUser: any,
    location: any,
    res: Response
) {
    const token = jwt.sign({ email: checkUser.email }, envConfig.JWT_SECRET, {
        expiresIn: '24h',
    })
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
            message: 'A verification email has been sent to you',
            success: false,
        })
}
