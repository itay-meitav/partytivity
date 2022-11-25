import { query as execQuery } from "./general";

const names = [
  "Oliver Hansen",
  "Van Henry",
  "April Tucker",
  "Ralph Hubbard",
  "Omar Alexander",
  "Carlos Abbott",
  "Miriam Wagner",
  "Bradley Wilkerson",
  "Virginia Andrews",
  "Kelly Snyder",
];

export function insertExampleServices() {
  names.forEach((x, i) => {
    const locationsQuery = {
      text: `INSERT INTO location_service(title, address, capacity, provider_id) VALUES($1, $2, $3, $4)`,
      values: [x, x, 200, 1],
    };
    const musicQuery = {
      text: `INSERT INTO music_service(title, provider_id) VALUES($1, $2)`,
      values: [x, 1],
    };
    const foodQuery = {
      text: `INSERT INTO food_service(title,type, provider_id) VALUES($1, $2, $3)`,
      values: [x, "fast", 1],
    };
    const entertainmentQuery = {
      text: `INSERT INTO entertainment_service(title, type, provider_id) VALUES($1, $2, $3)`,
      values: [x, "dance", 1],
    };
    const generalQuery = {
      text: `INSERT INTO general_service(title, type, provider_id) VALUES($1, $2, $3)`,
      values: [x, "photography", 1],
    };
    Promise.all([
      execQuery(locationsQuery),
      execQuery(musicQuery),
      execQuery(foodQuery),
      execQuery(entertainmentQuery),
      execQuery(generalQuery),
    ]).then(() =>
      console.log(`done insert service ${i} of ${names.length - 1}`)
    );
  });
}
