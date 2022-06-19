const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", async (req, res) => {
  res.render("loginAdmin");
});

router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/info",
    failureRedirect: "/loginAdmin",
    failureFlash: true,
  })
);

module.exports = router;
