import db from '../database'
import bcrypt from 'bcrypt'

const {
    SALT_ROUNDS,
    PEPPER
} = process.env

export type User = {
    id?: number;
    username: string;
    first_name: string;
    last_name: string;
    password: string;
    role?: string;
}

export class UserModel {
    async create(u: User): Promise<User> {
        try {
            
            const conn = await db.connect()
            const hash = bcrypt.hashSync(u.password+PEPPER, Number(SALT_ROUNDS))
            const sql = 'INSERT INTO users (username, first_name, last_name, hash) VALUES ($1, $2, $3, $4) RETURNING *'
            const result = await conn.query(sql, [u.username, u.first_name, u.last_name, hash])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Couldn't create user. Error ${err}`);
        }
    }
}