const express = require("express");

const apiV1Routes = require("./v1/apiV1Route");

const router = express.Router();

// redirect to apiV1Route for all version 1 related calls.
router.use("/v1", apiV1Routes);

module.exports = router;