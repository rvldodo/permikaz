const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bcrypt = require("bcrypt");

router.get("/", async (req, res) => {
  res.render("loginAdmin");
});

router.post("/", async (req, res) => {
  const { username, password, token } = req.body;

  const fetchData = await pool.query(
    "SELECT * FROM admin_permikaz WHERE user_name = $1",
    [username]
  );
  const data = fetchData.rows[0];

  try {
    // check data
    if (data) {
      // check data invalid
      if (
        (await data.user_name) !== username ||
        !(await bcrypt.compare(password, data.hash_password)) ||
        (await data.token) !== token
      ) {
        res.redirect("/loginAdmin");
      }

      //   check data valid
      if (
        (await data.user_name) === username &&
        (await bcrypt.compare(password, data.hash_password)) &&
        (await data.token) === token
      ) {
        res.redirect("/info");
      }
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
