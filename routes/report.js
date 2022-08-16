const router = require("express").Router();

// get the dashboard file
router.get("/", (req, res) => {
  res.render("report");
});

module.exports = router;
