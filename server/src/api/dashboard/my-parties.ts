import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { addParty, getUserParties } from "src/db/dashboard/my-parties";
import authConfig from "../auth/auth.config";
import { isAuthenticated } from "../auth/authMiddle";
const router = express.Router();
interface JWTData {
  id: any;
}

router.get("/", isAuthenticated, async (req: Request, res: Response) => {
  const token = req.cookies.token;
  const decoded = jwt.verify(token, authConfig.secret);
  const limit = Number(req.query.limit) || 20;
  const offset = Number(req.query.offset) || 0;
  const orderBy = req.query.orderBy ? req.query.orderBy.toString() : undefined;
  const parties = await getUserParties(
    (decoded as JWTData).id,
    limit,
    offset,
    orderBy
  );
  res.json({
    parties: parties,
    success: true,
  });
});

export default router;
