import express, { Request, Response } from "express";
import auth from "./api/auth";
import admin from "./api/admin";
import passport from "passport";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("API router is working");
});

router.use("/auth", auth);

router.use("/admin", passport.authorize("admin"), admin);
// router.use("/admin", admin);


export default router;
