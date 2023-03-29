const express = require("express");

const productRoutes = require("./apiV1ProductRoute");

const router = express.Router();

router.use("/products", productRoutes);

module.exports = router;