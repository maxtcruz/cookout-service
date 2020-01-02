const express = require("express");
const argon2 = require("argon2");
const crypto = require("crypto");
const User = require("../models/User");

const router = express();

// register
router.post("/register", async (req, res) => {
    const { 
        username, 
        password,
        firstName,
        lastName,
        email
    } = req.body;
    try {
        const existingUser = await User.findOne({username});
        if (existingUser) {
            return res.status(400).send("user with that username already exists.");
        } 
    } catch (err) {
        return res.status(500).json(err);
    }
    const salt = crypto.randomBytes(16);
    const hashedPassword = await argon2.hash(password, {salt});
    const user = new User({
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email
    });
    try {
        await user.save();
        res.status(200).json({
            token: {}
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// login
router.post("/login", async (req, res) => {
    const { 
        username,
        password
    } = req.body;
    try {
        const user = await User.findOne({username});
        if (user) {
            try {
                if (await argon2.verify(user.password, password)) {
                    res.json({
                        token: {} // TODO: generate auth token
                    });
                } else {
                    res.status(401).send("incorrect password");
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(404).send("user with given username doesn't exist.");
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;