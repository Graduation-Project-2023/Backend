import { Request, Response, NextFunction } from "express";
import { ModRequest } from "../types/jwt";
import { SessionRepo } from "../db/sessionRepo";

const session = new SessionRepo();

function isAuthed(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// use the verifyToken middleware to check if the user is logged in before usage
const isAuthorized = async (
  req: ModRequest,
  res: Response,
  next: NextFunction
) => {
  // decode the jwt token
  const sid = req.sid;
  const id = req.userId;
  const role = req.role;
  const faculty = req.faculty;
  try {
    const sn = await session.read({ sid });
    // check if the session is not expired
    if (new Date() > new Date(sn.expires)) {
      return res.status(401).json({ error: "Session expired" });
    }
    // check if the user is who they say they are
    if (sn.id != id) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // check if session is valid for the user
    if (!sn || sid !== sn.sid) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // check if user has the claimed role
    if (role != sn.role) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    // check if user has the claimed faculty
    if (faculty != sn.faculty) {
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (err) {
    res.status(401).json({ error: err });
  }
};

export default isAuthed;
