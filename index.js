const express = require("express");

// import variables
const devEnv = require("./env").development;

// Mongo DB connection
const mongoConnection = require("./config/mongoDbConnection");

// Routes
const routes = require("./routes/indexRoute.js");

// Initiate app
const app = express();

// Middle ware to extract form data sent with post request
app.use(express.urlencoded());

// Middle ware to extract raw json data sent with post request
app.use(express.json());

// redirect all requests to indexRouter
app.use("/", routes);


// Make app to listen at port.
app.listen(devEnv.PORT, function(error){
    if(error){
        console.error(error);
        return;
    }

    console.log("Server Running at port", devEnv.PORT);
});