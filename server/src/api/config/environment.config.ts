require('dotenv').config({ path: __dirname + '/../../../.env' })
import { z } from 'zod'
import { fromZodError } from 'zod-validation-error'

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']).default('development'),
    JWT_SECRET: z.string().min(1),
    EMAIL: z
        .string({
            description: 'Can be any email address connected to smtp server',
        })
        .email()
        .min(1),
    EMAIL_API_KEY: z
        .string({
            description: 'Optional api key for custom email address',
        })
        .min(1)
        .optional(),
    EMAIL_API_PASS: z
        .string({
            description: "The above email's password",
        })
        .min(1),
    CLOUDINARY_NAME: z
        .string({
            description: 'Free to get from cloudinary.com',
        })
        .optional(),
    CLOUDINARY_API_KEY: z
        .string({
            description: 'Free to get from cloudinary.com',
        })
        .optional(),
    CLOUDINARY_SECRET: z
        .string({
            description: 'Free to get from cloudinary.com',
        })
        .optional(),
    PROD_DATABASE_URL: z
        .string()
        .startsWith('postgres://', { message: 'Must provide valid pg url' })
        .optional(),
    DEV_DATABASE_URL: z.string().startsWith('postgres://', {
        message: 'Must provide valid pg url',
    }),
})

const env = {
    NODE_ENV: process.env.NODE_ENV,
    JWT_SECRET: process.env.JWT_SECRET,
    EMAIL: process.env.EMAIL,
    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
    EMAIL_API_PASS: process.env.EMAIL_API_PASS,
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
    PROD_DATABASE_URL: process.env.PROD_DATABASE_URL,
    DEV_DATABASE_URL: process.env.DEV_DATABASE_URL,
}

const results = envSchema.safeParse(env)

if (!results.success) {
    console.log(fromZodError(results.error))
}

export default envSchema.parse(env)
