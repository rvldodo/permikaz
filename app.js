const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const logger = require("morgan");

const PORT = process.env.PORT || 3000;
const app = express();

// config dotenv
require("dotenv").config();

// import sequelize
const { sequelize } = require("./models");

// require the passport
require("./config/passportConfig")(passport);

// middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger("dev"));

// settings ejs
app.set("view engine", "ejs");

// static files
app.use(express.static("public"));

// set session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.authenticate("session"));
app.use(passport.initialize());
app.use(passport.session());

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

// report
app.use("/report", require("./routes/report"));

// login admin
app.use("/admin", require("./routes/admin"));

// info
app.use("/info", require("./routes/info"));
