const pool = require("../db/db");

const getDataId = async (req, res) => {
  const { _id } = req.params;
  try {
    const dataId = await pool.query(
      "SELECT * FROM permikaz_data WHERE _id = $1",
      [_id]
    );
    const data = dataId.rows[0];
    res.render("update", { data });
  } catch (error) {
    console.log(error);
  }
};

const updateDataById = async (req, res) => {
  const { _id } = req.params;
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
  try {
    pool.query(
      "UPDATE permikaz_data SET first_name = $1, last_name = $2, email = $3, phone_number = $4, university = $5, major = $6, passport_number = $7, study_year = $8 WHERE _id = $9",
      [
        firstName,
        lastName,
        email,
        phoneNumber,
        university,
        major,
        passportNumber,
        year,
        _id,
      ]
    );
    res.redirect("/info");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getDataId, updateDataById };
