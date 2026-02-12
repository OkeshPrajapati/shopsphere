const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");
const {registerController, loginController, logoutController} = require("../controllers/authController")
const router = express.Router();



router.post("/register",asyncHandler(registerController) );
router.post("/login",asyncHandler(loginController) );
router.post("/logout", asyncHandler(logoutController));


module.exports = router;
