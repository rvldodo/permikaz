const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bcrypt = require("bcrypt");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const { firstName, lastName, username, password, password2 } = req.body;
  // check duplicates
  const dataFetch = await pool.query(
    "SELECT * FROM user_permikaz WHERE user_name = $1",
    [username]
  );
  const duplicates = dataFetch.rows;

  // check the username
  if (duplicates.length > 0) {
    console.log("USER ALREADY EXISTS");
    res.redirect("/register");
    return;
  }

  // compare the password

  //hashing the password
  const hashPassword = await bcrypt.hash(password, 10);

  try {
    await pool.query(
      "INSERT INTO user_permikaz (first_name, last_name, user_name, hash_password) VALUES ($1, $2, $3, $4)",
      [firstName, lastName, username, hashPassword]
    );
    res.redirect("/report");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
