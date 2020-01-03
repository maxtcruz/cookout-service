const mongoose = require("mongoose");

const LocationSchema = mongoose.Schema({
    type: {
        type: String,
        enum: ["Point"],
        required: true
    },
    coordinates: {
        type: [Number],
        required: true,
        default: undefined,
        validate: {
            validator: (coordinates) => {
                return coordinates.length === 2;
            },
            message: "coordinates must have length 2."
        }
    },
});

module.exports = LocationSchema;