const express = require("express");
const { createProduct, getaProduct, getAllProduct, updateProduct, deleteProduct, addToWishlist, rating , filterProducts, searchProduct } = require("../controller/productCtrl");

const { isAdmin, authMiddleware } = require("../middlewares/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, isAdmin, createProduct);

router.get("/:id", getaProduct);
router.post("/filter-products", filterProducts);
router.put("/wishlist", authMiddleware, addToWishlist);
router.put("/rating", authMiddleware, rating);
router.put("/:id", authMiddleware, isAdmin, updateProduct);
router.delete("/:id", authMiddleware, isAdmin, deleteProduct);
router.get("/", getAllProduct);
router.post("/search", searchProduct);
module.exports = router;