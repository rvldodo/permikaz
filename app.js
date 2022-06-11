const express = require("express");
const app = express();

const homeRoutes = require("./routes/homeRoutes");
const aboutRoutes = require("./routes/aboutRoutes");
const reportRoutes = require("./routes/reportRoutes");
const infoRouter = require("./routes/infoRouter");
const detailRouter = require("./routes/detailRouter");
const updateRoutes = require("./routes/updateRoutes");
const loginRouter = require("./routes/loginRouter");
const registerRouter = require("./routes/registerRouter");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// middleware
app.use(express.json());
app.set("view engine", "ejs");

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

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
