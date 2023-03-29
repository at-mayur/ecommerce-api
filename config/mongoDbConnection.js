const mongoose = require("mongoose");

const devEnv = require("../env").development;

mongoose.connect(devEnv.MONGO_URL)
.catch((error) => {
    console.error(error);
})
.then(() => {
    console.log("Connected to MongoDB...");
});

module.exports = mongoose.connection;