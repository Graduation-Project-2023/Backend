import express, { Request, Response } from "express";
import { auth_server } from "./api/auth";
import { admission_server } from "./api/admission";
import errors from "../error/errHandler";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  res.send("API router is working");
});

router.use("/", auth_server);
router.use("/", admission_server);
router.use((err: any, req: Request, res: Response, next: any) => {
  if (err.message && err.message in Object.keys(errors)) {
    return res.status(errors[err.message]).json({ error: err.message });
  }
  res.status(500).json({ error: "Internal Server Error" });
});

export default router;
