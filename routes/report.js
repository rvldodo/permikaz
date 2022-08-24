const router = require("express").Router();
const validator = require("validator");
const { UsersData } = require("../models");

// get the dashboard file
router.get("/", (req, res) => {
  res.render("report");
});

// create a student data
router.post("/", async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    university,
    major,
    passportNumber,
    year,
  } = req.body;

  let errors = [];
  try {
    // find duplicate
    const duplicate = await UsersData.findOne({
      where: { passport_number: passportNumber, last_name: lastName, email },
    });
    if (duplicate) {
      errors.push({ msg: "User already report" });
    }

    // validation
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phoneNumber ||
      !university ||
      !major ||
      !passportNumber ||
      !year
    ) {
      errors.push({ msg: "Please fill al fields" });
    }

    // check validation of email
    if (!validator.isEmail(email)) {
      errors.push({ msg: "Email is invalid" });
    }

    if (errors.length > 0) {
      res.redirect("/report");
    } else {
      await UsersData.create({
        first_name: firstName,
        last_name: lastName,
        email,
        phone_number: phoneNumber,
        university,
        major,
        passport_number: passportNumber,
        year,
      });

      res.render("successReport");
    }
  } catch (error) {
    console.log(error);
    return res.send(400).json(error);
  }
});

module.exports = router;
