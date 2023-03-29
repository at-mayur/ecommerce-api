const express = require("express");

const productRoutes = require("./apiV1ProductRoute");

const router = express.Router();

// redirect to apiV1ProductRoute for all products related calls.
router.use("/products", productRoutes);

module.exports = router;