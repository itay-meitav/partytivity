require("dotenv").config({ path: __dirname + "/../../../.env" });
export default {
  node_env: process.env.NODE_ENV,
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
    PROD_DATABASE_URL: process.env.PROD_DATABASE_URL,
    DEV_DATABASE_URL: process.env.DEV_DATABASE_URL,
  },
};
