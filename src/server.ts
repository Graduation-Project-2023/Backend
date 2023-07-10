import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import cors from "cors";
import passport from "passport";
import router from "./routes/index";
import errorHandler from "./middleware/errorHandler";
import sessionMiddleware from "./sessionMiddleware";
import { initConnection } from "./socket";

dotenv.config();
const port = process.env.PORT || 3000;

const app = express();
const server = createServer(app);
app.use(express.json());

app.set("trust proxy", 1);

// mandatory for passport in order to work
app.use(sessionMiddleware);

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

initConnection(server);
// const io = new Server(server, {
//   cors: {
//     origin: true,
//     credentials: true,
//   },
// });

// // test socket
// io.on("connection", (socket) => {
//   console.log("a user connected");
//   io.on("test event", () => {
//     console.log("testing");
//   });
// });

server.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

export default app;
