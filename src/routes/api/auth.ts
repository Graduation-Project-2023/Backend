import express, { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import sendEmail from "../../utils/mail";
import { UserRepo } from "../../db/userRepo";
import passport from "../../middleware/passport";
import bcrypt from "bcrypt";

const server = express.Router();
const User = new UserRepo();
const SECRET = process.env.JWT_SECRET as string;
const PEPPER = process.env.PEPPER as string;
const SALT_ROUNDS = process.env.SALT_ROUNDS as string;

server.post("/login", passport.authenticate("local"), (req, res) => {
  res.sendStatus(200);
});

server.post("/forgot_password", async (req: Request, res: Response) => {
  const email = req.body.email;
  if (!email) {
    return res.status(400).json({ error: "email is required" });
  }
  try {
    // check if user exists in db
    const user = await User.read({ email });
    if (!user) {
      return;
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

      sendEmail(
        email,
        "Reset password",
        "You have requested to reset your password",
        "A unique link to reset your password has been generated for you. To reset your password, click the following link and follow the instructions.",
        url,
        "Reset Password"
      );

      console.log(url);
      res.json({ message: "Reset link sent" });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
});

server.post("/reset_password/:token", async (req: Request, res: Response) => {
  const { token } = req.params;
  const { password, confpassword } = req.body;
  if (password !== confpassword) {
    return res
      .status(400)
      .json({ error: "password and confirm password don't match" });
  }
  if (!token || !password || !confpassword) {
    return res.status(400).json({ error: "token and password are required" });
  }
  try {
    const obj = jwt.decode(token) as JwtPayload;
    // console.log(obj);
    if (!obj) {
      return res.status(400).json({ error: "Invalid token" });
    }
    const user = await User.read({ email: obj.email });
    if (!user) {
      return res.status(401).json({ error: "Invalid token" });
    }
    jwt.verify(token, SECRET + user.password, async (err, decoded) => {
      if (err) {
        return res.status(401).json({ error: "Invalid token" });
      }
      const pass = bcrypt.hashSync(password + PEPPER, Number(SALT_ROUNDS));
      await User.update({ email: user.email }, { password: pass });
    });
    return res.json({ message: "Password updated" });
  } catch (err) {
    return res.status(500).json(err);
  }
});

server.get("/logout", (req: Request, res: Response, next: NextFunction) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
  });
});

// error handler
server.use(function (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

export default server;
