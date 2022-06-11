const express = require("express");
const router = express.Router();
const {
  showDetailData,
  deleteData,
} = require("../controller/detailController");

// show detail data by _id
router.get("/:_id", showDetailData);

// delete a data
router.get("/delete/:_id", deleteData);

module.exports = router;
