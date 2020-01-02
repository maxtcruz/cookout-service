const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser"); 
const cors = require("cors");
require("dotenv/config");

const app = express();

app.use(cors());
app.use(bodyParser.json());

const usersRoute = require("./routes/users");

app.use("/user", usersRoute);

app.get("/", (_, res) => {
    res.send("home page");
});

mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log("connected to DB.");
});

app.listen(3001);