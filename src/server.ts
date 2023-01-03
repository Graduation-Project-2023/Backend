import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import session from "express-session";
import router from "./routes/index";
import prisma from "./db";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import errorHandler from "./middleware/errorHandler";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());

// mandatory for passport in order to work
app.use(
  session({
    secret: process.env.SESSION_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
    },
    store: new PrismaSessionStore(prisma, {
      checkPeriod: 2 * 60 * 1000, //ms
      dbRecordIdIsSessionId: true,
      dbRecordIdFunction: undefined,
    }),
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
