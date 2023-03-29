const mongoose = require("mongoose");


const counterSchema = new mongoose.Schema({
    schema_name: {
        type: String,
        required: true
    },
    schema_counts: {
        count: {
            type: Number,
            required: true
        },
        deletedIds: [{
            type: Number
        }]
    }
}, { timestamps: true });


const counter = mongoose.model("Counter", counterSchema);

module.exports = counter;