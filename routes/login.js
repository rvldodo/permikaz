const router = require("express").Router();
const { Users } = require("../models");
const bcrypt = require("bcrypt");
const passport = require("passport");

// get the register file
router.get("/", (req, res) => {
  res.render("register");
});

// create or register a user
router.post("/", async (req, res) => {
  const { firstName, lastName, username, password, password2 } = req.body;

  // find the copy of user
  const user = await Users.findOne({ where: { username } });

  let errors = [];

  try {
    // validation
    if (!firstName || !lastName || !username || !password || !password2) {
      errors.push({ msg: "Please fill all fields" });
    }

    if (user) {
      if (username === user.username) {
        errors.push({ msg: "Username already in use" });
      }
    }

    if (password) {
      if (password.length < 6) {
        errors.push({ msg: "Password must be at least 6 characters" });
      }

      if (password !== password2) {
        errors.push({ msg: "Password mismatch" });
      }
    }

    // hash the password
    const passwordHash = await bcrypt.hash(password, 10);

    if (errors.length > 0) {
      res.render("register", { errors });
      console.log(errors);
    } else {
      await Users.create({
        first_name: firstName,
        last_name: lastName,
        username,
        password: passwordHash,
      });

      res.redirect("/register/login");
    }
  } catch (error) {
    console.log(error);
    return res.send(400).json(error);
  }
});

// get the login file if the user already registered
router.get("/login", (req, res) => {
  res.render("login");
});

// login handle
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/report",
    failureRedirect: "/register/login",
    failureFlash: true,
  })
);

module.exports = router;
