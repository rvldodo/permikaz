const { v4: uuid } = require("uuid");

const pool = require("../db/db");

const renderFormController = (req, res) => {
  res.render("report");
};

const postController = async (req, res) => {
  const _id = uuid();
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
    await pool.query(
      "INSERT INTO permikaz_data (_id, first_name, last_name, email, phone_number, university, major, passport_number, study_year) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [
        _id,
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
    res.render("successReport");
  } catch (error) {
    console.error(error);
  }
};

module.exports = { renderFormController, postController };
