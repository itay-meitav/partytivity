import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export function resetValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const { email } = req.body
    const emailSchema = z
        .string()
        .email()
        .regex(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/gi)
    const results = emailSchema.safeParse(email)
    if (!results.success) {
        return res.status(400).json({
            success: false,
            message: "The email entered don't match the system requirements",
        })
    }
    return next()
}
