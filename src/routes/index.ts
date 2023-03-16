import express, { Request, Response } from "express";
import auth from "./api/auth";
import admin from "./api/admin";
import passport from "passport";
import student from "./api/student";
import acquire from "./api/acquire";
import master from "./api/super/index";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("API router is working");
});

// public routes that don't need authentication
router.use("/auth", auth);
router.use("/", acquire);

router.use("/admin", passport.authorize(["admin"]), admin);

router.use("/student", passport.authorize(["student", "admin"]), student);

router.use("/master", passport.authorize(["super", "admin"]), master);

export default router;
