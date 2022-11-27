import express from "express";
import { isAuthenticated } from "../middlewares/auth";
import { removePhoto, uploadPhoto } from "../controllers/photos.controller";

const router = express.Router();
// router.use("/photos", express.static(__dirname + "/photos/"));
router.post("/", isAuthenticated, uploadPhoto);
router.post("/remove", isAuthenticated, removePhoto);

export default router;
