const express = require("express");
const app = express();

const homeRoutes = require("./routes/homeRoutes");
const reportRoutes = require("./routes/reportRoutes");
const infoRouter = require("./routes/infoRouter");

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

// report
app.use("/report", reportRoutes);

// info
app.use("/info", infoRouter);
