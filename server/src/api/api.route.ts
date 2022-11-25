import express from "express";
import register from "./routes/register.route";
import login from "./routes/login.route";
import invite from "./routes/invite.route";
import auth from "./routes/auth.route";
import dashboard from "./routes/dashboard.route";
import photos from "./routes/photos.route";

const router = express.Router();
router.use("/register", register);
router.use("/login", login);
router.use("/auth", auth);
router.use("/dashboard", dashboard);
router.use("/photos", photos);
router.use("/invite", invite);

export default router;
