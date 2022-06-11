const express = require("express");
const router = express.Router();
const { getDataId, updateDataById } = require("../controller/updateController");

router.get("/:_id", getDataId);

router.post("/:_id", updateDataById);

module.exports = router;
