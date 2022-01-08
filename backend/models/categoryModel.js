const mongoose = require("mongoose");
const CatagorySchema = mongoose.Schema({
    category_name: {
        type: String,
        required: [false, "pls enter category name"],
    },
    created_at: {
        type: Date,
        default: Date.now,
    }
})
module.exports = mongoose.model("Catagory", CatagorySchema)
