const express = require("express");
const {createProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct } = require("../controllers/productController");

const asyncHandler = require("../middleware/asyncHandler")
const upload = require("../middleware/uploadMiddleware")
const router = express.Router();

router.post("/create", upload.array("images", 5),asyncHandler(createProduct));
router.get("/",asyncHandler(getAllProducts));
router.get("/:id",asyncHandler (getSingleProduct));
router.patch("/:id", upload.array("images", 5), (updateProduct));
router.delete("/:id", asyncHandler(deleteProduct));





module.exports = router;
