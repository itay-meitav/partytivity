import { query as execQuery } from "./general";

export async function addUser(details: {
  username: string;
  password: string;
  email: string;
  name: string;
  status?: string;
  role?: string;
}) {
  if (details.role == "admin") {
    const query = {
      text: `INSERT INTO users(username, password, email, name, status, role) VALUES($1, $2, $3, $4, $5, $6)`,
      values: [
        details.username,
        details.password,
        details.email,
        "admin",
        "active",
        "admin",
      ],
    };
    return execQuery(query).then((data) => data.rows);
  } else {
    const query = {
      text: `INSERT INTO users(username, password, email, name) VALUES($1, $2, $3, $4)`,
      values: [details.username, details.password, details.email, details.name],
    };
    return execQuery(query).then((data) => data.rows);
  }
}

export async function checkIfUserExist(username: string) {
  const query = {
    text: `SELECT * FROM users WHERE username = $1`,
    values: [username],
  };
  return execQuery(query).then((data) => data.rows[0]);
}

export async function checkUserEmail(email: string) {
  const query = {
    text: `SELECT * FROM users WHERE email = $1`,
    values: [email],
  };
  return execQuery(query).then((data) => data.rows[0]);
}

export async function checkUserId(id: number) {
  const query = {
    text: `SELECT * FROM users WHERE id = $1`,
    values: [id],
  };
  return execQuery(query).then((data) => data.rows[0]);
}

export async function changeUserStatus(username: string) {
  const query = {
    text: `UPDATE users SET status = $1 WHERE username = $2`,
    values: ["active", username],
  };
  return execQuery(query).then((data) => data.rows[0]);
}

export async function changeUserPass(details: { id: any; password: string }) {
  const query = {
    text: `UPDATE users SET password = $1 WHERE id = $2`,
    values: [details.password, details.id],
  };
  return execQuery(query).then((data) => data.rows[0]);
}
