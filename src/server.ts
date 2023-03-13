import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import router from "./routes/index";
import prisma from "./db";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import errorHandler from "./middleware/errorHandler";
import { v4 as uuidv4 } from 'uuid';

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.set("trust proxy", 1);

// mandatory for passport in order to work
app.use(
  session({
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
    rolling: false // Set the rolling option to false
  })
);

const corsOptions = {
  origin: true,
  credentials: true,
  // exposedHeaders: ["set-cookie"],
};

app.use(cors(corsOptions));
app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/admin-portal", (req, res) => {
  res.send("Admin Portal");
});

app.use("/api", router);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
