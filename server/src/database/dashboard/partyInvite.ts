import { query as execQuery } from "../general";
import { JwtPayload } from "jsonwebtoken";

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
