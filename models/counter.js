const mongoose = require("mongoose");

// Counter schema to store currIndex and deletedIds of product
const counterSchema = new mongoose.Schema({
    // Schema name. i.e. Product
    schema_name: {
        type: String,
        required: true
    },
    schema_counts: {
        // curr index
        count: {
            type: Number,
            required: true
        },
        // stores deleted ids so that we can reuse those ids.
        deletedIds: [{
            type: Number
        }]
    }
}, { timestamps: true });


const counter = mongoose.model("Counter", counterSchema);

module.exports = counter;