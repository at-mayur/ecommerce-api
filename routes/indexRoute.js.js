const express = require("express");

const apiRoutes = require("./api/indexApiRoute");

const router = express.Router();

router.use("/api", apiRoutes);

module.exports = router;