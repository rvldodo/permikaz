const express = require("express");
const bodyParser = require("body-parser");

const PORT = process.env.PORT || 3000;
const app = express();

// import sequelize
const { sequelize } = require("./models");

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// settings ejs
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

// settings port
app.listen(PORT, async () => {
  console.log(`Server running on ${process.env.NODE_ENV} mode in port ${PORT}`);
  await sequelize.authenticate();
  console.log("Database connected");
});

// ROUTES
// dashboard
app.use("/", require("./routes/dashboard"));

// about
app.use("/about", require("./routes/about"));

// register
app.use("/register", require("./routes/login"));
