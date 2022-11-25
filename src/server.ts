import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from 'express-session';
import router from "./routes/index";
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import { PrismaClient } from "@prisma/client";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// mandatory for passport in order to work
app.use(session({
    secret: process.env.SESSION_SECRET as string,
    resave: false, 
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: new PrismaSessionStore(
      new PrismaClient(),
      {
        checkPeriod: 2 * 60 * 1000,  //ms
        dbRecordIdIsSessionId: true,
        dbRecordIdFunction: undefined,
      }
    )
}))

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
// delete
import { UserRepo } from "./db/userRepo";

const user = new UserRepo();
import bcrypt from "bcrypt";
require('dotenv').config();
const PEPPER = process.env.PEPPER as string;
const passwo = 123456;
app.get("/", (req: express.Request, res: express.Response) => {
  const pass = bcrypt.hashSync(passwo+PEPPER, 13);
  user.create({
    email: "mohamed.raafat@eng.suez.edu.eg",
    password: pass,
    role: "ADMIN",
  });
  res.send("Hello World!");
});

app.use("/api", router);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
