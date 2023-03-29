const mongoose = require("mongoose");

const devEnv = require("../env").development;

// Connecting to db
mongoose.connect(devEnv.MONGO_URL)
// Handling error while connection
.catch((error) => {
    console.error(error);
})
.then(() => {
    console.log("Connected to MongoDB...");
});

module.exports = mongoose.connection;