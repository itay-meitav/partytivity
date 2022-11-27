import { query as execQuery } from "../general";
import jwt from "jsonwebtoken";
import envConfig from "../../api/config/environment.config";

export async function addParty(details: {
  title: string;
  description?: string;
  date: Date;
  ownerId: number;
  locationID?: number;
  musicID?: number;
  foodID?: number;
  entertainmentID?: number;
  generalID?: number;
  photos?: string[];
}) {
  const query = {
    text: `INSERT INTO parties(title, description, date, owner_id, location_id, music_id, food_id, entertainment_id, general_id, photos) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
    values: [
      details.title,
      details.description || "",
      details.date,
      Number(details.ownerId),
      details.locationID || null,
      details.musicID || null,
      details.foodID || null,
      details.entertainmentID || null,
      details.generalID || null,
      details.photos || [],
    ],
  };
  const res = await execQuery(query);
  const token = jwt.sign({ id: res.rows[0].id }, envConfig.jwt.JWT_SECRET);
  const tokenQuery = {
    text: `UPDATE parties SET invite_token = $1 WHERE id = $2 RETURNING *`,
    values: [token, res.rows[0].id],
  };
  const tokenRes = await execQuery(tokenQuery);
  return tokenRes.rows[0].invite_token;
}

export async function getServiceIDByTitle(title: string, serviceType: string) {
  const query = {
    text: `SELECT id FROM ${serviceType} WHERE title = $1`,
    values: [title],
  };
  const res = await execQuery(query);
  return { [serviceType]: res.rows[0].id };
}

export async function getServicesByType(serviceType: string) {
  const query = {
    text: `SELECT title FROM ${serviceType}`,
  };
  const res = await execQuery(query);
  return res.rows;
}
