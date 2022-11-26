import { Request, Response, NextFunction } from "express";
import { ModRequest } from "../types/jwt";

function isAuthed(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

export default isAuthed;
