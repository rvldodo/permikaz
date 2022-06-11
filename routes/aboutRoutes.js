const express = require("express");
const router = express.Router();

router.get("/", require("../controller/aboutController"));

module.exports = router;
