const router = require("express").Router();

// get the about file
router.get("/", (req, res) => {
  res.render("about");
});

module.exports = router;
