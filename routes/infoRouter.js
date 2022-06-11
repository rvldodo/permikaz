const express = require("express");
const router = express.Router();
const renderShowDataController = require("../controller/infoController");

// show all
router.get("/", renderShowDataController);

module.exports = router;
