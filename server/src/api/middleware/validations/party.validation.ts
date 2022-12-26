import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'

export function partyValidation(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const partyDetails = {
        title: req.body.title,
        description: req.body.description,
        date: req.body.date,
        collaborators: req.body.collaborators,
        services: req.body.services,
        photos: req.body.photos,
    }
    const partyDetailsSchema = z.object({
        title: z
            .string()
            .regex(/^[a-zA-Z0-9\s]+$/)
            .min(1),
        description: z.string().optional(),
        date: z.date(),
        collaborators: z.array(z.string()).optional(),
        services: z
            .object({
                entertainmentService: z.string().optional(),
                foodService: z.string().optional(),
                musicService: z.string().optional(),
                generalService: z.string().optional(),
                locationService: z.string().optional(),
            })
            .optional(),
        photos: z.array(z.string()).optional(),
    })
    const results = partyDetailsSchema.safeParse(partyDetails)
    if (!results.success) {
        return res.status(400).json({
            success: false,
            message: "The details entered don't match the system requirements",
        })
    }
    return next()
}
