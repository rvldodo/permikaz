const pool = require("../db/db");

// show all data
const renderShowDataController = async (req, res) => {
  const db = await pool.query("SELECT * FROM permikaz_data");
  try {
    const data = db.rows;
    // res.json(data);
    res.render("info", { data });
  } catch (error) {
    console.log(error);
  }
};

module.exports = renderShowDataController;
