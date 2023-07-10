import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import prisma from "../db";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/user";
import { College } from "@prisma/client";
import { Student } from "../models/student";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";

dotenv.config();
const PEPPER = process.env.PEPPER as string;
const SECRET = process.env.JWT_SECRET as string;
export interface UserTypes {
  id?: string;
  email?: string;
  password?: string;
  role?: string;
  student?: Student;
}

passport.use(
  new LocalStrategy(
    { usernameField: "email", passReqToCallback: true },
    async (req, email, password, done) => {
      try {
        // console.log(req.body.portal)  // comment this out
        let user: any;
        if (req.body.portal === "STUDENT") {
          // get the user from the student table
          user = await User.getUserByEmailWithData(email);
          user.college = await prisma.college.findUnique({
            where: { id: user.student.collegeId },
          });
        } else {
          // get the user from the admin table
          user = await User.getUserByEmailWithData(email);
          if (user?.role === "ADMIN") {
            user.college = await prisma.college.findUnique({
              where: { id: user.admin?.collegeId },
            });
          } else if (user?.role === "PROFESSOR") {
            user.college = await prisma.college.findUnique({
              where: { id: user.professor.collegeId },
            });
          }
        }
        // else if (req.body.portal === "Professor") {
        //   // get the user from the professor table
        //   user = await User.getUserByEmailWithProfessor(email);
        // }
        if (!user) {
          // no error has occurred, but the user does not exist
          return done(null, false, { message: "Incorrect email or password" });
        } else if (user) {
          const password_match = await bcrypt.compare(
            password + PEPPER,
            user.password
          );
          if (password_match || password === user.password) {
            if (
              user.role === "ADMIN" ||
              user.role === "SUPER" ||
              user.role === "PROFESSOR"
            ) {
              /**
               * the sessionID, when it reaches the session store in server.ts it changes for seome reason that
               *  I don't know, so I'm generating a new one here and passing it to the request body so that
               *  I can use it as the sessionID in the session store and in the JWT token payload and in
               *  the session table in the database, at the end of the day it's just an ID so it doesn't
               *  matter who generates it as long as it's unique for each session
               */
              req.body.session = uuidv4();
              // attach JWT token to the request body if the user is admin
              let token;
              if (user.role === "ADMIN") {
                token = jwt.sign(
                  {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    college: user.admin.collegeId,
                    session: req.body.session,
                    expires: req.session.cookie.expires,
                  },
                  SECRET,
                  { expiresIn: "1w" }
                );
              } else if (user.role === "PROFESSOR") {
                token = jwt.sign(
                  {
                    id: user.id,
                    email: user.email,
                    role: user.role,
                    college: user.professor.collegeId,

                    session: req.body.session,
                    expires: req.session.cookie.expires,
                  },
                  SECRET,
                  { expiresIn: "1w" }
                );
              }
              req.body.token = token;
            }
            // no error has occurred, and the user exists and the password is correct
            /**
             * this happens first
             */
            return done(null, user);
          }
        }
        // no error has occurred, but the password is incorrect
        return done(null, false, { message: "Incorrect email or password" });
      } catch (err) {
        // an error has occurred
        return done(err);
      }
    }
  )
);

passport.serializeUser((user: UserTypes, done) => {
  /**
   * this happens third
   */
  if (user.role === "STUDENT") {
    if (!user.student) {
      return done(null, user.id);
    }
    done(null, { id: user.id, studentId: user.student.id });
  } else {
    done(null, { id: user.id });
  }
});

passport.deserializeUser(async (id: UserTypes, done) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: id.id,
      },
    });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

passport.authorize = (roles: string[]) => {
  return async (req: any, res: any, next: any) => {
    if (req.isAuthenticated()) {
      if (roles.includes("bypass")) {
        return next();
      }
      /**
       * check the portal of the user
       * if the user is a student, then check if the user is trying to access the assets of the same student
       * if the user is an admin, then check if the user is trying to access the assets of the same admin
       *
       */
      if (roles.includes("student")) {
        // check if the user is trying to access the assets of the same student
        if (req.session.passport.user.studentId === req.query.studentId) {
          return next();
        } else {
          return next({
            status: 401,
            message: "You don't have access to this resource",
          });
        }
      } else if (roles.includes("admin")) {
        // check the jwt token if the method is get
        if (req.method === "GET") {
          const authHeader = req.headers["authorization"];
          if (!authHeader) {
            return res.status(401).json({ err: "No token provided" });
          }
          const token = authHeader.split(" ")[1] as string;
          try {
            // check if the token is not altered
            let decoded = jwt.verify(token, SECRET) as JwtPayload;
            const session_date = new Date(decoded.expires);
            const current_date = new Date();
            // the token is not expired
            if (session_date.getTime() > current_date.getTime()) {
              return next();
            } else {
              return next({
                status: 401,
                message: "You don't have access to this resource",
              });
            }
          } catch (err) {
            return next({
              status: 401,
              message: "Invalid token",
            });
          }
          // if the request method is not get
        } else {
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
            } else {
              return next({
                status: 401,
                message: "You don't have access to this resource",
              });
            }
          } catch (error) {
            return next({
              status: 401,
              message: "Invalid token",
            });
          }
        }
      }
      // check the identity of the user
      // if (roles.includes(req.user?.role.toLowerCase())) {
      //   return next();
      // } else {
      //   return next({ status: 401, message: "Unauthorizedxx" });
      // }
    } else {
      return next({ status: 401, message: "Unauthorized" });
    }
  };
};

export default passport;
