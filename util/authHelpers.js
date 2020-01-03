const jwt = require("jsonwebtoken");

const getNewAuthToken = (userId) => {
    return jwt.sign({id: userId}, process.env.JWT_SECRET, {
        expiresIn: "30d"
    });
};

// middleware used to require authentication for a particular route
const authRequired = (req, res, next) => {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        const token = req.headers.authorization.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                res.status(500).send("failed to authenticate token.");
            } else {
                req.userId = decoded.id;
                next();
            }
        });
    } else {
        res.status(403).send("no auth token provided.");
    }
};

module.exports = {
    getNewAuthToken,
    authRequired
};