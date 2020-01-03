const express = require("express");
const User = require("../models/User");
const { authRequired } = require("../util/authHelpers");

const router = express();

// get logged in user's info
router.get("/me", authRequired, async (req, res) => {
    try {
        const me = await User.findOne({_id: req.userId});
        if (!me) {
            res.status(404).send("no user found.");
        } else {
            res.status(200).json(me);
        }
    } catch (err) {
        res.status(500).json(err);
    }
});

// fetch nearby users within given radius
router.get("/within:miles", authRequired, async (req, res) => {
    const radians = req.params.miles / 3958.8; // radians = miles / radius of earth
    try {
        const me = await User.findOne({_id: req.userId});
        const nearbyUsers = await User.find({
            location: {
                $geoWithin: {
                    $centerSphere: [me.location.coordinates, radians]
                }
            }
        }).select("firstName lastName");
        res.status(200).json(nearbyUsers);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;