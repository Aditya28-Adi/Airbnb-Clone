const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user");

const googleClientID = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;
const googleCallbackURL =
  process.env.GOOGLE_CALLBACK_URL ||
  "http://localhost:3000/auth/google/callback";

const googleConfigured = Boolean(googleClientID && googleClientSecret);

if (googleConfigured) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: googleClientID,
        clientSecret: googleClientSecret,
        callbackURL: googleCallbackURL,
      },

      async (accessToken, refreshToken, profile, done) => {
        try {
          const email = profile.emails?.[0]?.value;

          if (!email) {
            return done(new Error("Google account did not provide an email address."));
          }

          let user = await User.findOne({ googleId: profile.id });

          if (user) {
            return done(null, user);
          }

          user = await User.findOne({ email });

          if (user) {
            user.googleId = profile.id;
            user.authType = "google";
            await user.save();
            return done(null, user);
          }

          const newUser = new User({
            username: profile.displayName,
            email,
            googleId: profile.id,
            authType: "google",
          });

          await newUser.save();

          return done(null, newUser);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );
} else {
  console.warn(
    "Google OAuth is disabled. Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env to enable Google login."
  );
}

module.exports = { googleConfigured };
