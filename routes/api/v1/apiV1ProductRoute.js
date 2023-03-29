const express = require("express");

const productController = require("../../../controllers/productController");

const router = express.Router();

router.get("/", productController.getProductsList);

router.post("/create", productController.createProduct);

router.delete("/:id", productController.deleteProduct);

router.post("/:id/update_quantity/", productController.updateProduct);

module.exports = router;