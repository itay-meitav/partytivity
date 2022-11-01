import express from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import {
  addParty,
  getServiceIDByTitle,
  getServicesByType,
} from "../../db/dashboard/new-party";
import authConfig from "../auth/auth.config";
import { isAuthenticated } from "../auth/authMiddle";
const router = express.Router();

router.post("/", isAuthenticated, async (req, res) => {
  const token = req.cookies.token;
  const { id } = jwt.verify(token, authConfig.secret) as JwtPayload;
  let servicesID = {
    location_service: null,
    music_service: null,
    food_service: null,
    entertainment_service: null,
    general_service: null,
  };
  if (req.body.services) {
    const filteredPartyServices = Object.entries(req.body.services).filter(
      ([serviceKey, serviceValue]) => serviceValue !== ""
    );
    const serviceFunctions = filteredPartyServices.map(
      async ([serviceKey, serviceValue]: any) => {
        const tableName = serviceKey
          .toLowerCase()
          .replace("service", "_service");
        return await getServiceIDByTitle(serviceValue, tableName);
      }
    );
    try {
      const servicesIDReq = await Promise.all(serviceFunctions);
      servicesID = Object.assign(servicesID, ...servicesIDReq);
    } catch (error) {
      return res.status(404).json({
        message:
          "One or more of the services you specified does not exist in the system",
        success: false,
      });
    }
  }
  try {
    addParty({
      title: req.body.title,
      description: req.body.description || "",
      date: req.body.date,
      ownerId: Number(id),
      locationID: servicesID.location_service,
      musicID: servicesID.music_service,
      foodID: servicesID.food_service,
      entertainmentID: servicesID.entertainment_service,
      generalID: servicesID.general_service,
      photos: req.body.photos || [],
    }).then((partyToken) => {
      return res.json({ success: true, partyToken: partyToken });
    });
  } catch (error) {
    return res.status(500).json({
      message:
        "There is an error creating the party right now. Try again later.",
      success: false,
    });
  }
});

router.post("/services", async (req, res) => {
  try {
    const serviceType = req.body.serviceType
      .split(/(?=[A-Z])/)
      .join("_")
      .toLowerCase();
    const data = await getServicesByType(serviceType);
    return res.json({ services: data, success: true });
  } catch (error) {
    return res.status(500).json({ message: error.message, success: false });
  }
});

export default router;
