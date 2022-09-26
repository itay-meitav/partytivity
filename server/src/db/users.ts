import { query as execQuery } from "./general";

export async function addUser(details: {
  username: string;
  password: string;
  email: string;
  status?: string;
  isAdmin?: boolean;
}) {
  if (details.isAdmin) {
    const query = {
      text: `INSERT INTO users(username, password, email, status, is_admin) VALUES($1, $2, $3, $4, $5)`,
      values: [
        details.username,
        details.password,
        details.email,
        "active",
        true,
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

export async function checkIfUserExist(username: { username: string }) {
  const query = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [username.username],
  };
  return execQuery(query).then((data) => data.rows[0]);
}

export async function checkUserEmail(user: { email: string }) {
  const query = {
    text: `SELECT * FROM users WHERE email = $1`,
    values: [user.email],
  };
  return execQuery(query).then((data) => data.rows[0]);
}

export async function checkUserId(user: { id: string }) {
  const query = {
    text: `SELECT * FROM users WHERE id = $1`,
    values: [user.id],
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
