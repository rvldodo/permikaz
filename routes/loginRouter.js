const express = require("express");
const router = express.Router();
const pool = require("../db/db");
const bcrypt = require("bcrypt");
const flash = require("connect-flash");

router.get("/", async (req, res) => {
  res.render("login");
});

router.post("/", async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password)
    return res
      .status(400)
      .json({ message: "Username and password are required" });

  const dataFetch = await pool.query(
    "SELECT * FROM user_permikaz WHERE user_name = $1",
    [username]
  );
  const data = dataFetch.rows[0];
  try {
    if (
      data.user_name !== username ||
      !(await bcrypt.compare(password, data.hash_password))
    ) {
      res.redirect("/login");
    }

    if (
      data.user_name === username &&
      (await bcrypt.compare(password, data.hash_password))
    ) {
      res.redirect("/report");
    }
  } catch (error) {
    res.redirect("/login");
  }
});
module.exports = router;
