const express = require("express");
const router = express.Router();
const pool = require("../config/dbConfig");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const { firstName, lastName, username, password, password2 } = req.body;

  let errors = [];

  // check if the user fill all the fields
  if (!firstName || !lastName || !username || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    //   check if the password is longer than 6 characters
    errors.push({ message: "Password must be at least 6 characters" });
  }

  //   check if the password is match
  if (password !== password2) {
    errors.push({ message: "Password do not match" });
  }

  if (errors.length > 0) {
    res.render("register", { errors });
  } else {
    //hashing the password
    const hashPassword = await bcrypt.hash(password, 10);

    // check if the username is exist
    pool.query(
      "SELECT * FROM user_permikaz WHERE username = $1",
      [username],
      (err, result) => {
        if (err) throw err;

        if (result.rows.length > 0) {
          errors.push({ message: "Username already exist" });
          res.render("register", { errors });
        } else {
          // insert data to user_permikaz DB
          pool.query(
            "INSERT INTO user_permikaz(first_name, last_name,  username, hash_password) VALUES($1, $2, $3, $4)",
            [firstName, lastName, username, hashPassword],
            (err, result) => {
              if (err) throw err;
              req.flash("success_msg", "You are now registered. Please login!");
              res.redirect("/login");
            }
          );
        }
      }
    );
  }
});

module.exports = router;
