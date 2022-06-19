const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");

// import routes
const homeRoutes = require("./routes/homeRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const reportRoutes = require("./routes/reportRoutes");
const infoRouter = require("./routes/infoRouter");
const detailRouter = require("./routes/detailRouter");
const updateRoutes = require("./routes/updateRoutes");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");
const loginAdminRouter = require("./routes/loginAdminRouter");

const PORT = process.env.PORT || 3000;

const initialize = require("./config/passportConfig");

initialize(passport);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// set engine
app.set("view engine", "ejs");

// set static
app.use(express.static("public"));

//parse JSON data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// set cookieParser, session and flash
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

// home
app.use("/", homeRoutes);

// about
app.use("/about", aboutRoutes);

// report
app.use("/report", reportRoutes);

// info
app.use("/info", infoRouter);

// detail
app.use("/detail", detailRouter);

// update data
app.use("/update", updateRoutes);

// Logins
app.use("/login", loginRouter);

// register
app.use("/register", registerRouter);

// loginAdmin
app.use("/loginAdmin", loginAdminRouter);

// NEED TO SET THE DATABASE AND VALIDATION FOR INSERT INTO DATABASE
