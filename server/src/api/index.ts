import express from "express";
import register from "./register";
import login from "./login";
import auth from "./auth/auth";
import dashboard from "./dashboard/index";
import photos from "./photos/photos";

const router = express.Router();
router.use("/register", register);
router.use("/login", login);
router.use("/auth", auth);
router.use("/dashboard", dashboard);
router.use("/photos", photos);

export default router;
