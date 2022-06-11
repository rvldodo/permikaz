const express = require("express");
const router = express.Router();
const {
  renderFormController,
  postController,
} = require("../controller/reportController");

router.get("/", renderFormController);

router.post("/", postController);

module.exports = router;
