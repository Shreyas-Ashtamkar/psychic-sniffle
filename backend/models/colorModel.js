const mongoose = require("mongoose");
const ColourSchema = mongoose.Schema({
    color_name: {
        type: String,
        required: [false, "pls enter color name"],
    },
    color_code: {
        type: String,
        required: false,
    }
})
module.exports = mongoose.model("Colour", ColourSchema)
