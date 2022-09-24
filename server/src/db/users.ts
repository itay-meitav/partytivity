import { query as execQuery } from "./general";

export async function addUser(details: {
  username: string;
  password: string;
  email: string;
  confirmed?: boolean;
  isAdmin?: boolean;
}) {
  if (details.isAdmin) {
    const query = {
      text: `INSERT INTO users(username, password, email, confirmed, is_admin) VALUES($1, $2, $3, $4, $5)`,
      values: [
        details.username,
        details.password,
        details.email,
        true,
        details.isAdmin,
      ],
    };
    return execQuery(query).then((data) => data.rows);
  } else {
    const query = {
      text: `INSERT INTO users(username, password, email) VALUES($1, $2, $3)`,
      values: [details.username, details.password, details.email],
    };
    return execQuery(query).then((data) => data.rows);
  }
}
