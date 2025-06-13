const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/userController");
const validateRequest = require("../middlewares/validationHandler");
const registerUserSchema = require("../validation-schemas/userSchema");

router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post("/login", validateRequest(registerUserSchema), loginUser);

module.exports = router;
