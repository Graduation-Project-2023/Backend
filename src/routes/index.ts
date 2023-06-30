import express, { Request, Response } from "express";
import auth from "./api/auth";
import admin from "./api/admin";
import passport from "passport";
import student from "./api/student";
import acquire from "./api/acquire";
import master from "./api/super/index";
import callback from "./api/callback";
import { MessageController } from "../controllers/messages";

const router = express.Router();

const messageController = new MessageController();

router.get("/", (req: Request, res: Response) => {
  res.send("API router is working");
});

// public routes that don't need authentication
router.use("/auth", auth);
router.use("/", acquire);
router.use("/payments", callback);

router.use("/admin", passport.authorize(["admin"]), admin);

router.use("/student", passport.authorize(["student"]), student);

router.use(
  "/message",
  passport.authorize(["bypass"]),
  messageController.getAll
);

router.use("/master", passport.authorize(["super", "admin"]), master);

export default router;
