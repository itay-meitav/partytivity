import express from "express";
import {
  changePassword,
  checkResetToken,
  login,
  logout,
  sendReset,
} from "../controllers/login.controller";
const router = express.Router();

router.post("/", login);
router.post("/reset", sendReset);
router.route("/reset/new/:token").get(checkResetToken).post(changePassword);
router.get("/logout", logout);

export default router;
