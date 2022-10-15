import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  addParty,
  getServiceIDByName,
  getServicesList,
  getUserParties,
} from "../../db/dashboard/my-parties";
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

router.post("/new", isAuthenticated, async (req: Request, res: Response) => {
  const entertainmentServiceID = req.body.entertainmentService
    ? await getServiceIDByName(
        req.body.entertainmentService,
        "entertainment_service"
      )
    : null;
  const locationServiceID = req.body.locationService
    ? await getServiceIDByName(req.body.locationService, "location_service")
    : null;
  const musicServiceID = req.body.musicService
    ? await getServiceIDByName(req.body.musicService, "music_service")
    : null;
  const generalServiceID = req.body.generalService
    ? await getServiceIDByName(req.body.generalService, "general_service")
    : null;
  const foodServiceID = req.body.foodService
    ? await getServiceIDByName(req.body.foodService, "food_service")
    : null;
  const token = req.cookies.token;
  const decoded = jwt.verify(token, authConfig.secret);
  try {
    await addParty({
      title: req.body.title,
      description: req.body.description,
      date: req.body.date,
      ownerId: (decoded as JWTData).id,
      locationID: locationServiceID,
      musicID: musicServiceID,
      foodID: foodServiceID,
      entertainmentID: entertainmentServiceID,
      generalID: generalServiceID,
    }).then(() => {
      return res.json({ success: true });
    });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
});

router.post("/new/services", async (req, res) => {
  try {
    const serviceType = req.body.serviceType.toLowerCase().replace(" ", "_");
    const data = await getServicesList(serviceType);
    return res.json({ services: data, success: true });
  } catch (error) {
    return res.status(500).json({ message: error, success: false });
  }
});

export default router;
