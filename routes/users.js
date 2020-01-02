const express = require("express");
const argon2 = require("argon2");
const crypto = require("crypto");
const User = require("../models/User");

const router = express();

// create user
router.post("/", async (req, res) => {
    const { 
        username, 
        password,
        firstName,
        lastName,
        email
    } = req.body;
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
        const data = await user.save();
        res.json({
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email
        });
    } catch (err) {
        res.json({message: err});
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
                        user: {
                            username: user.username,
                            firstName: user.firstName,
                            lastName: user.lastName,
                            email: user.email
                        },
                        token: {} // TODO: generate auth token
                    });
                } else {
                    res.status(401).send("incorrect password");
                }
            } catch {
                res.json({message: err});
            }
        } else {
            res.status(401).send("user doesn't exist.");
        }
    } catch (err) {
        res.json({message: err});
    }
});

module.exports = router;