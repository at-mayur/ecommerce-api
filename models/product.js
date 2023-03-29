const mongoose = require("mongoose");

// Product Schema
const productSchema = new mongoose.Schema({
    id: {
        type: Number,
        required: true,
        unique: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_quantity: {
        type: Number,
        required: true
    }
}, { timestamps: true });


const product = mongoose.model("Product", productSchema);

module.exports = product;