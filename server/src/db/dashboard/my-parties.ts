import authConfig from "../../api/auth/auth.config";
import { query as execQuery } from "../general";
import jwt, { JwtPayload } from "jsonwebtoken";

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
  const token = jwt.sign({ id: res.rows[0].id }, authConfig.secret);
  const tokenQuery = {
    text: `UPDATE parties SET invite_token = $1 WHERE id = $2 RETURNING *`,
    values: [token, res.rows[0].id],
  };
  const tokenRes = await execQuery(tokenQuery);
  return tokenRes.rows[0].invite_token;
}

export async function getUserParties(
  usernameId: string,
  limit: number,
  offset: number,
  orderBy?: any
) {
  const query = {
    text: `SELECT * FROM parties WHERE owner_id = $1 order by ${
      orderBy || "parties.id"
    }
    limit $2 offset $3`,
    values: [usernameId, limit, offset],
  };
  const res = await execQuery(query);
  return res.rows;
}

export async function countUserParties(usernameId: string) {
  const query = {
    text: `SELECT COUNT(*) FROM parties WHERE owner_id = $1`,
    values: [usernameId],
  };
  const res = await execQuery(query);
  return res.rows[0].count;
}

export async function getServiceIDByTitle(title: string, serviceType: string) {
  const query = {
    text: `SELECT id FROM ${serviceType} WHERE title = $1`,
    values: [title],
  };
  const res = await execQuery(query);
  return { [serviceType]: res.rows[0].id };
}

export async function getServiceTitleByID(
  serviceID: string,
  serviceType: string
) {
  const query = {
    text: `SELECT title FROM ${serviceType} WHERE id = $1`,
    values: [serviceID],
  };
  const res = await execQuery(query);
  return { [serviceType]: res.rows[0].title };
}

export async function getServicesByType(serviceType: string) {
  const query = {
    text: `SELECT title FROM ${serviceType}`,
  };
  const res = await execQuery(query);
  return res.rows;
}

export async function getOwnerNameByID(ownerID: number) {
  const query = {
    text: `SELECT name FROM users WHERE id = $1`,
    values: [ownerID],
  };
  const res = await execQuery(query);
  return res.rows[0].name;
}

export async function getPartyDetailsByID(partyID: string | JwtPayload) {
  const query = {
    text: `SELECT * FROM parties WHERE id = $1`,
    values: [partyID],
  };
  const res = await execQuery(query);
  const partyOwner = await getOwnerNameByID(res.rows[0].owner_id);
  const partyServices = Object.entries(res.rows[0]).slice(5, 10);
  const filteredPartyServices = partyServices.filter(
    ([serviceKey, serviceValue]) => serviceValue !== null
  );
  const serviceFunctions = filteredPartyServices.map(
    async ([serviceKey, serviceValue]) => {
      const tableName = serviceKey.replace("id", "service");
      return await getServiceTitleByID(serviceValue.toString(), tableName);
    }
  );
  try {
    const servicesIDReq = await Promise.all(serviceFunctions);
    const servicesTitles = Object.assign({}, ...servicesIDReq);
    return {
      title: res.rows[0].title,
      description: res.rows[0].description || "",
      date: res.rows[0].date,
      partyOwner: partyOwner,
      entertainmentService: servicesTitles.entertainment_service || "",
      musicService: servicesTitles.music_service || "",
      foodService: servicesTitles.food_service || "",
      generalService: servicesTitles.general_service || "",
      locationService: servicesTitles.location_service || "",
      photos: res.rows[0].photos || [],
    };
  } catch (error) {
    console.log(error.message);
  }
}

export async function addGuestToParty(details: {
  partyID: string;
  name: string;
  phone: string;
  isComing: string;
  comment?: string;
}) {
  const getGuestsQuery = {
    text: `SELECT guests FROM parties WHERE id = $1`,
    values: [details.partyID],
  };
  const res = await execQuery(getGuestsQuery);
  if (res.rows[0].guests.filter((x) => x.phone == details.phone).length) {
    throw new Error("this phone is already registered to this party");
  }
  const guests = [
    ...res.rows[0].guests,
    {
      name: details.name,
      phone: details.phone,
      isComing: details.isComing,
      comment: details.comment || "",
    },
  ];
  const query = {
    text: `UPDATE parties SET guests = $1 WHERE id = $2 RETURNING *`,
    values: [JSON.stringify(guests), details.partyID],
  };
  const res2 = await execQuery(query);
  return res2.rows[0];
}
