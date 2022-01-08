const mongoose = require("mongoose");
const SubImagesSchema = mongoose.Schema({
    product_subImages: [
        {
            type: String,
            required: false
        }
    ]
})
module.exports = mongoose.model("SubImages", SubImagesSchema)
