const router = require("express").Router();
const { UsersData } = require("../models");

// get all the data
router.get("/", async (req, res) => {
  const data = await UsersData.findAll();

  res.render("info", { data });
});

// get the specific data
router.get("/detail/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    const data = await UsersData.findOne({ where: { uuid } });
    if (!data) throw new Error();
    res.render("detail", { data });
  } catch (error) {
    console.log(error);
    return res.send(404).json(error);
  }
});

// delete the user data by uuid
router.delete("/detail/:uuid", async (req, res) => {
  const { uuid } = req.params;
  try {
    await UsersData.destroy({ where: { uuid } });
    res.redirect("/info");
  } catch (error) {
    console.log(error);
    return res.send(404).json(error);
  }
});
module.exports = router;
