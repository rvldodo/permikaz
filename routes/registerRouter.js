const express = require("express");
const router = express.Router();
const pool = require("../db/db");

router.get("/", (req, res) => {
  res.render("register");
});

router.post("/", async (req, res) => {
  const { firstName, lastName, username, password, password2 } = req.body;

  try {
    await pool.query(
      "INSER INTO user_permikaz (first_name, last_name, user_name, hash_password) VALUES ($1, $2, $3, $4)",
      [firstName, lastName, username, password]
    );
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
