import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export function loginValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const userDetails = {
        username: req.body.username,
        password: req.body.password,
    }
    const userDetailsSchema = z.object({
        username: z
            .string()
            .regex(/^[a-zA-Z0-9]+$/gi)
            .min(3)
            .max(15),
        password: z.string().regex(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/g),
    })
    const results = userDetailsSchema.safeParse(userDetails)
    if (!results.success) {
        return res.status(400).json({
            success: false,
            message: "The details entered don't match the system requirements",
        })
    }
    return next()
}
