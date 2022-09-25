import { query as execQuery } from "./general";

export async function addUser(details: {
  username: string;
  password: string;
  email: string;
  confirmationCode: string;
  status?: string;
  isAdmin?: boolean;
}) {
  if (details.isAdmin) {
    const query = {
      text: `INSERT INTO users(username, password, email, status, confirmation_code, is_admin) VALUES($1, $2, $3, $4, $5, $6)`,
      values: [
        details.username,
        details.password,
        details.email,
        "active",
        "admin",
        true,
      ],
    };
    return execQuery(query).then((data) => data.rows);
  } else {
    const query = {
      text: `INSERT INTO users(username, password, email, confirmation_code) VALUES($1, $2, $3, $4)`,
      values: [
        details.username,
        details.password,
        details.email,
        details.confirmationCode,
      ],
    };
    return execQuery(query).then((data) => data.rows);
  }
}

export async function checkIfUserExist(username: { username: string }) {
  const query = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [username.username],
  };
  return execQuery(query).then((data) => data.rows[0]);
}

export async function searchForToken(user: { confirmationCode: string }) {
  const query = {
    text: `SELECT * FROM users WHERE confirmation_code = $1`,
    values: [user.confirmationCode],
  };
  return execQuery(query).then((data) => data.rows[0]);
}

export async function changeUserStatus(user: { username: string }) {
  const query = {
    text: `UPDATE users SET status = $1 WHERE username = $2`,
    values: ["active", user.username],
  };
  return execQuery(query).then((data) => data.rows[0]);
}
