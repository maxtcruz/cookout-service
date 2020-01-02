const express = require("express");
const bodyParser = require("body-parser"); 
const cors = require("cors");
require("dotenv").config();
require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const userRoute = require("./routes/user");
app.use("/user", userRoute);

const authRoute = require("./routes/auth");
app.use("/auth", authRoute);

app.get("/", (_, res) => {
    res.send("home page");
});

module.exports = app;