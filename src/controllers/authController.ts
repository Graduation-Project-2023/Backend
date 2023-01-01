import { Request, Response, NextFunction } from "express";
import passport from "../middleware/passport";
import jwt, { JwtPayload } from "jsonwebtoken";
import sendEmail from "../utils/mail";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { Controller } from "./controller";

const SECRET = process.env.JWT_SECRET as string;
const PEPPER = process.env.PEPPER as string;
const SALT_ROUNDS = process.env.SALT_ROUNDS as string;

export class AuthController extends Controller {
  constructor() {
    super(User);
  }

  login = async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate("local", (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return next({
          status: 401,
          message: info.message,
        });
      }
      req.logIn(user, (err) => {
        if (err) {
          return next({
            status: 400,
            message: err.message,
          });
        }
        return res.sendStatus(200);
      });
    })(req, res, next);
    // console.log(req.session);
    // console.log(req.sessionID);
    // const user = await User.read({ email: req.body.email });
    // console.log(req.user);
    // const session = await Session.read({ sid: req.sessionID });
    // console.log(session);
    // // console.log(req.user.role);
    // const token = jwt.sign(
    //   {
    //     userId: req.session.passport?.user,
    //     role: req.user,
    //     sid: req.sessionID,
    //     expires: req.session.cookie.expires
    //   },
    //   "dfdfd", { expiresIn: "30d" }
    //   );
    // console.log(req.session.cookie.expires);
    // res.status(200).json({ token });
    // return res.sendStatus(200);
  };

  forgetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const email = req.body.email;
    if (!email) {
      return next({
        status: 400,
        message: "email is required",
      });
    }
    try {
      // check if user exists in db
      const user = await this.model.get(email);
      if (!user) {
        return next({
          status: 400,
          message: "user not found",
        });
      } else {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
            role: user.role,
          },
          SECRET + user.password,
          { expiresIn: "15m" }
        );
        const url = `http://localhost:8080/reset_password/${token}`;
        console.log(url);
        // sendEmail(
        //   email,
        //   "Reset password",
        //   "You have requested to reset your password",
        //   "A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions.",
        //   url,
        //   "Reset Password"
        // );
        res.json({ message: "Reset link sent" });
      }
    } catch (err) {
      return next(err);
    }
  };

  resetPassword = async (req: Request, res: Response, next: NextFunction) => {
    const { token } = req.params;
    const { password, confpassword } = req.body;
    if (password !== confpassword) {
      return next({
        status: 401,
        message: "password and confirm password must match",
      });
    }
    if (!token || !password || !confpassword) {
      return next({
        status: 401,
        message: "token is required",
      });
    }
    try {
      const obj = jwt.decode(token) as JwtPayload;
      if (!obj) {
        return next({
          status: 498,
          message: "Invalid token",
        });
      }
      const user = await this.model.get(obj.email);
      if (!user) {
        return next({
          status: 498,
          message: "Invalid token",
        });
      }
      jwt.verify(token, SECRET + user.password, async (err, decoded) => {
        if (err) {
          return next({
            status: 498,
            message: "Invalid token",
          });
        }
        const pass = bcrypt.hashSync(password + PEPPER, Number(SALT_ROUNDS));
        await this.model.update(user.email, pass);
        return res.status(200).json({ message: "Password updated" });
      });
    } catch (err) {
      next(err);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    req.logout((err) => {
      if (err) {
        return next(err);
      }
      res.sendStatus(200);
    });
  };
}
