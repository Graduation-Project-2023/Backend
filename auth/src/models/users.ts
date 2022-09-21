import db from '../database'
import bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid';

const {
    SALT_ROUNDS,
    PEPPER
} = process.env

export type User = {
    id?: number;
    username?: string;
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

    async get_by_name(username: string): Promise<User> {
        try {
            const conn = await db.connect()
            const sql = 'SELECT username FROM users WHERE username=($1)'
            const result = await conn.query(sql, [username])
            conn.release()
            return result.rows[0]
        } catch(err) {
            throw new Error(`Couldn't find user. Error: ${err}`)
        }
    }

    async update(u: User): Promise<User> {
        try {
            let queryParams = '';
            let passedCount = 1;
            let passedData = [];
            passedData.push(u.id);
            if(u.username && u.username !== undefined){
                passedCount++; 
                queryParams += `username=$${passedCount},`; 
                passedData.push(u.username)
            }
            if(u.email && u.email !== undefined){
                passedCount++; 
                queryParams += `email=$${passedCount},`; 
                passedData.push(u.email)
            }
            // if(u.first_name && u.first_name !== undefined){
            //     passedCount++; 
            //     queryParams += `first_name=$${passedCount},`; 
            //     passedData.push(u.first_name)
            // }
            // if(u.last_name && u.last_name !== undefined){
            //     passedCount++; 
            //     queryParams += `last_name=$${passedCount},`; 
            //     passedData.push(u.last_name)
            // }
            if(u.password && u.password !== undefined){
                passedCount++; 
                queryParams += `password=$${passedCount},`; 
                passedData.push(bcrypt.hashSync(u.password+PEPPER, Number(SALT_ROUNDS)))
            }
            if(u.role && u.role !== undefined){
                passedCount++;
                queryParams += `role=$${passedCount},`;
                passedData.push(u.role)
            }
            const conn = await db.connect()
            const params = String(queryParams).slice(0, -1)
            const sql = `UPDATE users SET ${params} WHERE id=$1 RETURNING *`
            // console.log(passedCount, passedData, sql)
            const updatedUser = await conn.query(sql, passedData)
            return updatedUser.rows[0]
        } catch(err) {
            throw new Error(`Couldn't update user. Error ${err}`);
        }
    }

}