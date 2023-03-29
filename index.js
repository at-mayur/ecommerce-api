const express = require("express");

const devEnv = require("./env").development;
const mongoConnection = require("./config/mongoDbConnection");

const routes = require("./routes/indexRoute.js");


const app = express();

app.use(express.urlencoded());

app.use(express.json());

app.use("/", routes);

app.listen(devEnv.PORT, function(error){
    if(error){
        console.error(error);
        return;
    }

    console.log("Server Running at port", devEnv.PORT);
});