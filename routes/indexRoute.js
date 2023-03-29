const express = require("express");

const apiRoutes = require("./api/indexApiRoute");

const router = express.Router();

// redirect to indexApiRoute for all api related calls.
router.use("/api", apiRoutes);

module.exports = router;