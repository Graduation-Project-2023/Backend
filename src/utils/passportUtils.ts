import { Request, Response, NextFunction } from "express";
import { SessionRepo } from "../db/sessionRepo";
import { UserRepo } from "../db/userRepo";

const session = new SessionRepo();
const User = new UserRepo();

function isAuthed(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// // use the verifyToken middleware to check if the user is logged in before usage
// const isAuthorized = async (
//   req: ModRequest,
//   res: Response,
//   next: NextFunction
// ) => {
//   // decode the jwt token
//   const sid = req.sid;
//   const id = req.userId;
//   const role = req.role;
//   const faculty = req.faculty;
//   try {
//     const sn = await session.read({ sid });
//     // check if the session is not expired
//     if (new Date() > new Date(sn.expires)) {
//       return res.status(401).json({ error: "Session expired" });
//     }
//     // check if the user is who they say they are
//     if (sn.id != id) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     // check if session is valid for the user
//     if (!sn || sid !== sn.sid) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     // check if user has the claimed role
//     if (role != sn.role) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//     // check if user has the claimed faculty
//     if (faculty != sn.faculty) {
//       return res.status(401).json({ error: "Unauthorized" });
//     }
//   } catch (err) {
//     res.status(401).json({ error: err });
//   }
// };

declare module "express-session" {
  export interface SessionData {
    passport: { user: string };
  }
}

const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.session.passport?.user) {
    return res.status(401).json({ message: "Unauthorized" });
    //   return next({
    //     status: 401,
    //     message: "Unauthorized"
    // })
  }
  const usr = await User.read({ id: req.session.passport?.user });
  if (!usr) {
    return res.status(401).json({ message: "Unauthorized" });
    // return next({
    //   status: 401,
    //   message: "Unauthorized"
    // })
  }
  if (usr.role != "ADMIN") {
    return res.status(401).json({ message: "Unauthorized" });
    // return next({
    //   status: 401,
    //   message: "Unauthorized"
    // })
  }
  // if (usr.faculty != req.body.faculty) {
  //   next({
  //     status: 401,
  //     message: "Unauthorized"
  //   })
  // }
  next();
};

const isStudent = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.session.passport?.user);
  if (!req.session.passport?.user) {
    return res.status(401).json({ message: "Unauthorized" });
    // return next({
    //   status: 401,
    //   message: "Unauthorized"
    // })
  }
  const usr = await User.read({ id: req.session.passport?.user });
  if (!usr) {
    return res.status(401).json({ message: "Unauthorized" });
    // return next({
    //   status: 401,
    //   message: "Unauthorized"
    // })
  }
  if (usr.role != "STUDENT") {
    return res.status(401).json({ message: "Unauthorized" });
    // return next({
    //   status: 401,
    //   message: "Unauthorized"
    // })
  }
  // if (usr.faculty != req.body.faculty) {
  //   next({
  //     status: 401,
  //     message: "Unauthorized"
  //   })
  // }
  next();
};

export { isAuthed, isAdmin, isStudent };
