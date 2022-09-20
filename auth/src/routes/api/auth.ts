import express, { Request, Response } from 'express'
import { User, UserModel } from '../../models/users'
import sendEmail from '../../utils/mail'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const server = express.Router()
const usr = new UserModel()
const SECRET = process.env.JWT_SECRET as string
const PEPPER = process.env.PEPPER as string

server.post('/register', async (req: Request, res: Response) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'username, email and password are required' })
    }
    const user: User = {username, email, password}
    try {
        // console.log(user);
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

        res.json({user, token})
    } catch(err) {
        return res.status(500).json(err)
    }
})

server.post('/reset_password', async (req: Request, res: Response) => {
    const email = req.body.email
    if (!email) {
        return res.status(400).json({ error: 'email is required' })
    }
    try {
        sendEmail(email, "https://www.google.com");
        res.json({message: 'Reset link sent'})
    } catch(err) {
        return res.status(500).json(err)
    }
})

server.post('/signout', async (req: Request, res: Response) => {

})

export default server;