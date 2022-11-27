require("dotenv").config({ path: __dirname + "/../../../.env" });
export default {
  jwt: { JWT_SECRET: process.env.JWT_SECRET },
  email: {
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS,
  },
  photos: {
    CLOUDINARY_NAME: process.env.CLOUDINARY_NAME,
    CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY,
    CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  },
  db: {
    DATABASE_URL: process.env.DATABASE_URL,
  },
};
