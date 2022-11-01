import { query as execQuery } from "../general";

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
