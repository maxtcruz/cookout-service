const mongoose = require("mongoose");
const LocationSchema = require("./Location");

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        select: false,
        minlength: 8
    },
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    location: {
        type: LocationSchema,
        required: false
    },
    created_on: {
        type: Date,
        default: Date.now()
    }
});

module.exports = UserSchema;