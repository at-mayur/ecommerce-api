const express = require("express");

const productController = require("../../../controllers/productController");

const router = express.Router();

// Get request to fetch all products list. http://localhost:8000/api/v1/products
router.get("/", productController.getProductsList);

// Post request to create new product. http://localhost:8000/api/v1/products/create
router.post("/create", productController.createProduct);

// Delete request to delete a product. http://localhost:8000/api/v1/products/<id>
router.delete("/:id", productController.deleteProduct);

// post request to update a product. http://localhost:8000/api/v1/products/<id>/update_quantity/?number=<qty>
router.post("/:id/update_quantity/", productController.updateProduct);

module.exports = router;