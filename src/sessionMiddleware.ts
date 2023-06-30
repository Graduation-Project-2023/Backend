import session from "express-session";
import dotenv from "dotenv";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./db";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

export default session({
  genid: (req) => {
    /**
     * this happens second
     */
    if (req.body.session) {
      return req.body.session; // use the sessionID from the request body that was generated in passport.ts
    } else {
      return uuidv4();
    }
  },
  secret: process.env.SESSION_SECRET as string,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    sameSite: "none",
    secure: process.env.NODE_ENV === "production" ? true : false,
    httpOnly: process.env.NODE_ENV === "production" ? true : false,
  },
  store: new PrismaSessionStore(prisma, {
    checkPeriod: 2 * 60 * 1000, //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }),
  rolling: false, // Set the rolling option to false
});
