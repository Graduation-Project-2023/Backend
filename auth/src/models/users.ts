import db from '../database'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

const {
    SALT_ROUNDS,
    PEPPER
} = process.env

export type User = {
    id?: number;
    username: string;
    email: string;
    password: string;
    role?: string;
}

export class UserModel {
    async create(u: User): Promise<User> {
        try {
            
            const conn = await db.connect()
            const hash = bcrypt.hashSync(u.password+PEPPER, Number(SALT_ROUNDS))
            const sql = 'INSERT INTO users (id, username, email, password, role, created_at) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *'
            const result = await conn.query(sql, [uuidv4(), u.username, u.email, hash, 'user', new Date()])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Couldn't create user. Error ${err}`);
        }
    }

    // needs fix !!!!
    async get_user(email: string): Promise<User> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT * FROM users WHERE email=($1)'
            const result = await conn.query(sql, [email])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Couldn't find user. Error: ${err}`)
        }
    }
}