import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import passport from "passport";
import passportGoogle from "passport-google-oauth20";
import User from "../Model/userModel.js";

const googleAuthStrategy = passportGoogle.Strategy;

passport.use(
  new googleAuthStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: "/auth/google/redirect",
    },

    async (accessToken, refreshToken, profile, cb) => {
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        user = await User.create({
          googleId: profile.id,
          name: profile.displayName,
          email: profile.emails?.[0].value,
        });
      }

      return cb(null, user);
    },
  ),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const validUser = await User.findOne(id)
  done(null,validUser)
});
export default passport;
