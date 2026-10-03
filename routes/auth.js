const express = require("express");
const router = express.Router();
const passport = require("passport");
const { googleConfigured } = require("../config/passportGoogle");

router.get("/google", (req, res, next) => {
  if (!googleConfigured) {
    req.flash(
      "error",
      "Google login is not configured. Add Google OAuth credentials to the .env file."
    );
    return res.redirect("/login");
  }

  passport.authenticate("google", {
    scope: ["profile", "email"],
  })(req, res, next);
});

router.get(
  "/google/callback",
  (req, res, next) => {
    if (!googleConfigured) {
      req.flash("error", "Google login is not configured.");
      return res.redirect("/login");
    }

    passport.authenticate("google", {
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res, next);
  },
  (req, res) => {
    req.flash("sucess", "Welcome! Logged in with Google.");
    res.redirect("/listings");
  }
);

module.exports = router;
