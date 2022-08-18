const router = require("express").Router();

// get the admin static file
router.get("/", (req, res) => {
  res.render("loginAdmin");
});

module.exports = router;
