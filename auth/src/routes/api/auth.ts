import express, { Request, Response } from 'express'
import { User, UserModel } from '../../models/users'
import {validate, userValidationRules} from '../../utils/validate'
import sendEmail from '../../utils/mail'
import jwt, { JwtPayload } from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const server = express.Router()
const usr = new UserModel()
const SECRET = process.env.JWT_SECRET as string
const PEPPER = process.env.PEPPER as string

server.post('/register', userValidationRules(), validate, async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body
        const user: User = {username, email, password}
        const lookup_mail = await usr.get_user(email)
        const lookup_name = await usr.get_by_name(username)
        if (lookup_mail && lookup_name) {
            return res.status(400).json({message: 'Username and email already in use'})
        } else if (lookup_mail) {
            return res.status(400).json({ error: 'email already in use' })
        } else if (lookup_name) {
            return res.status(400).json({ error: 'username already in use' })
        }
        const newUser = await usr.create(user)
        return res.json(newUser)
    } catch(err) {
        res.status(500).json(err)
    }
})

server.post('/login', async (req: Request, res: Response) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({ error: 'email and password are required' })
    }
    // const user: User = {email, password}
    try {
        const user = await usr.get_user(email)
        if (!user || !bcrypt.compareSync(password + PEPPER, user.password)) {
            return res.status(401).json({ error: 'Invalid email/password' })
        }

        // issue JWT
        let token = jwt.sign({
            username: user.username, 
            email: user.email, 
            role: user.role
        }, SECRET, { expiresIn: '15d' })

        res.json({ token })
    } catch(err) {
        return res.status(500).json(err)
    }
})

server.post('/forgot_password', async (req: Request, res: Response) => {
    const email = req.body.email
    if (!email) {
        return res.status(400).json({ error: 'email is required' })
    }
    try {
        // check if user exists in db
        const user = await usr.get_user(email)
        if (!user) {
            return
        } else {
            const token = jwt.sign({
                id: user.id,
                username: user.username, 
                email: user.email, 
                role: user.role
            }, SECRET+user.password, {expiresIn: '15m'})
            const url = `http://localhost:3000/api/auth/reset_password/${token}`
            sendEmail(email, url)
            // console.log(url);
            res.json({message: 'Reset link sent'})
        }
    } catch(err) {
        return res.status(500).json(err)
    }
})

server.post('/reset_password/:token', async (req: Request, res: Response) => {
    const { token } = req.params
    const { password, confpassword } = req.body
    if (!password !== !confpassword) {
        return res.status(400).json({ error: 'password and confirm password don\'t match' })
    }
    if (!token || !password || !confpassword) {
        return res.status(400).json({ error: 'token and password are required' })
    }
    try {
        const obj = jwt.decode(token) as JwtPayload
        // console.log(obj);
        if (!obj) {
            return res.status(400).json({ error: 'Invalid token' })
        }
        const user = await usr.get_user(obj.email)
        if (!user) {
            return res.status(401).json({ error: 'Invalid token' })
        }
        jwt.verify(token, SECRET+user.password, async (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Invalid token' })
            }
            const u: User = {id: user.id, email: user.email, password}
            const updatedUser = await usr.update(u)
            // const sql = 'UPDATE users SET password=($1) WHERE email=($2)'
            // const conn = await db.connect()
            // const result = await conn.query(sql, [hash, user.email])
            const user2 = await usr.get_user(user.email)
            res.json(user2)
        })
        return
        res.json({message: 'Password updated'})
    } catch(err) {
        return res.status(500).json(err)
    }
})

server.post('/signout', async (req: Request, res: Response) => {

})

export default server;