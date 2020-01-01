const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");

const app = express();

app.get("/", (req, res) => {
    res.send("home page");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("connected to DB.");
});

app.listen(3001);