import { query as execQuery } from './general'

export async function addUser(details: {
    username: string
    password: string
    email: string
    name: string
    status?: 'pending' | 'active'
    role?: 'client' | 'admin'
}) {
    const query = {
        text: `INSERT INTO users(username, password, email, name, status, role) VALUES($1, $2, $3, $4, $5, $6) RETURNING *`,
        values: [
            details.username,
            details.password,
            details.email,
            details.name,
            details.status || 'pending',
            details.role || 'client',
        ],
    }
    const res = await execQuery(query)
    return res.rows[0]
}

export async function checkIfUserExist(username: string) {
    const query = {
        text: `SELECT * FROM users WHERE username = $1`,
        values: [username],
    }
    const res = await execQuery(query)
    return res.rows[0]
}

export async function checkUserEmail(email: string) {
    const query = {
        text: `SELECT * FROM users WHERE email = $1`,
        values: [email],
    }
    const res = await execQuery(query)
    return res.rows[0]
}

export async function changeUserStatus(email: string) {
    const query = {
        text: `UPDATE users SET status = $1 WHERE email = $2`,
        values: ['active', email],
    }
    const res = await execQuery(query)
    return res.rows[0]
}

export async function changeUserPass(details: {
    email: string
    password: string
}) {
    const query = {
        text: `UPDATE users SET password = $1 WHERE email = $2 RETURNING *`,
        values: [details.password, details.email],
    }
    const res = await execQuery(query)
    return res.rows[0]
}

export async function checkUserLastPassword(email: string) {
    const query = {
        text: `SELECT password FROM users WHERE email = $1`,
        values: [email],
    }
    const res = await execQuery(query)
    return res.rows[0]
}
