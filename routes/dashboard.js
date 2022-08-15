const router = require("express").Router();

// get the dashboard file
router.get("/", (req, res) => {
  res.render("dashboard");
});

module.exports = router;
