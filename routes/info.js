const router = require("express").Router();
const { UsersData } = require("../models");

// get the info file
router.get("/", async (req, res) => {
  const data = await UsersData.findAll();

  res.render("info", { data });
});

module.exports = router;
