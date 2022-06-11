const express = require("express");
const router = express.Router();

const pool = require("../db/db");

router.get("/", (req, res) => {
  res.render("report");
});

router.post("/", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      university,
      major,
      passportNumber,
      year,
    } = req.body;
    const newData = await pool.query(
      "INSERT INTO permikaz_data (first_name, last_name, email, phone_number, university, major, passport_number, study_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *",
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        university,
        major,
        passportNumber,
        year,
      ]
    );
    res.redirect("/info");
  } catch (error) {
    console.error(error);
  }
});

module.exports = router;
