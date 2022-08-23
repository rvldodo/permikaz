const router = require("express").Router();
const bcrypt = require("bcrypt");
const { Admins } = require("../models");
const passport = require("passport");

// get the admin static file
router.get("/", (req, res) => {
  res.render("loginAdmin");
});

// create the admin
/*
router.post("/", async (req, res) => {
  const { username, password, token } = req.body;

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const hashToken = await bcrypt.hash(token, 10);

    const admin = await Admins.create({
      username,
      password: hashPassword,
      token: hashToken,
    });
    return res.json(admin);
  } catch (error) {
    console.log(error);
    return res.send(404).json(error);
  }
});
*/

// check if the user is admin or not
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/info",
    failureRedirect: "/admin",
    failureFlash: true,
  })
);
module.exports = router;
