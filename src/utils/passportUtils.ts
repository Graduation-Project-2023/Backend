import { Request, Response, NextFunction } from "express";

function isAuthed(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    next({ status: 401, message: "Unauthorized" });
  }
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "ADMIN") {
    return next({ status: 401, message: "Unauthorized" });
  }
  next();
};

const isStudent = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.user || req.user.role !== "STUDENT") {
    return next({ status: 401, message: "Unauthorized" });
  }
  next();
};

export { isAuthed, isAdmin, isStudent };
