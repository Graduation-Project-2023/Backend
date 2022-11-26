import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { UserRepo } from "../db/userRepo";
import { UserTypes } from "../models/user";

const User = new UserRepo();
const PEPPER = process.env.PEPPER as string;

passport.use(
  new LocalStrategy(
    { usernameField: "email" },
    async (email, password, done) => {
      try {
        const user = await User.read({ email });
        if (!user) {
          // no error has occurred, but the user does not exist
          return done(null, false, { message: "Incorrect email or password" });
        } else if (user) {
          const password_match = await bcrypt.compare(
            password + PEPPER,
            user.password
          );
          if (password_match)
            // no error has occurred, and the user exists and the password is correct
            return done(null, user);
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
  done(null, user.id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.read({ id });
    if (!user) {
      return done(null, false);
    }
    return done(null, user);
  } catch (err) {
    return done(err);
  }
});

export default passport;
