const express = require("express");
const pool = require("../db/db");
const router = express.Router();

// show all details
router.get("/", async (req, res) => {
  const db = await pool.query("SELECT * FROM permikaz_data");
  try {
    const data = db.rows;
    // res.json(data);
    res.render("info", { data });
  } catch (error) {
    console.log(error);
  }
});

// show detail data by _id
router.get("/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    const detailData = await pool.query(
      "SELECT * FROM permikaz_data WHERE _id = $1",
      [_id]
    );
    const data = detailData.rows[0];
    // res.json(data);
    res.render("detail", { data });
  } catch (error) {
    console.log(error);
  }
});

// delete a data
router.get("/delete/:_id", async (req, res) => {
  const { _id } = req.params;
  try {
    pool.query("DELETE FROM permikaz_data WHERE _id = $1", [_id]);
    res.redirect("/info");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
