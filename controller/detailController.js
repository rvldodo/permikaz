const pool = require("../db/db");

const showDetailData = async (req, res) => {
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
};

const deleteData = async (req, res) => {
  const { _id } = req.params;
  try {
    pool.query("DELETE FROM permikaz_data WHERE _id = $1", [_id]);
    res.redirect("/info");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { showDetailData, deleteData };
