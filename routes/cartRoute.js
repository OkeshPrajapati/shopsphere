const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware")
const asyncHandler = require("../middleware/asyncHandler");
const { addToCart, updateCartItem, removeCartItem } = require("../controllers/cartController");

router.post("/", authMiddleware,asyncHandler(addToCart));
router.put("/update", authMiddleware,asyncHandler(updateCartItem));
router.delete("/delete", authMiddleware, asyncHandler(removeCartItem));


module.exports = router;
