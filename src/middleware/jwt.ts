import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import prisma from "../db";

const SECRET = process.env.JWT_SECRET as string;

// verify token middleware
async function verifyToken(req: Request, res: Response, next: Function) {
  // check the session id from the jwt token
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ err: "No token provided" });
  }
  try {
    const token = authHeader.split(" ")[1] as string;
    let decoded = jwt.verify(token, SECRET) as JwtPayload;
    // check if the session actually exists
    const session_data = await prisma.session.findUnique({
      where: {
        id: decoded.session,
      },
    });
    if (!session_data) {
      return next({
        status: 401,
        message: "Try logging in again",
      });
    }
    // check if the session is not expired
    const session_date = new Date(session_data.expiresAt);
    const current_date = new Date();
    if (session_date.getTime() > current_date.getTime()) {
      // ensure that the admin doesn't access the assets of another college
      if (req.body.collegeId) {
        if (req.body.collegeId !== decoded.college) {
          return next({
            status: 401,
            message: "You don't have access to this college",
          });
        }
      }
      return next();
    }
}
 
 catch (error) {
return next({
  status: 401,
  message: "Invalid token",
});
}}

async function tokenDecode(req: Request, res: Response, next: Function) {
  // check the session id from the jwt token
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ err: "No token provided" });
  }
  try {
    const token = authHeader.split(" ")[1] as string;
    let decoded = jwt.verify(token, SECRET) as JwtPayload;
    // get the user id from the jwt token
    return decoded.professorId;
  } catch (error) {
    return next({
      status: 401,
      message: "Invalid token",
    });
  }
}

    

export default tokenDecode;
