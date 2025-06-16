const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  authUser,
} = require("../controllers/userController");
const validateRequest = require("../middlewares/validationHandler");
const authHandler = require("../middlewares/authHandler");
const { loginUserSchema, registerUserSchema } = require("../validation-schemas/userSchema");

router.post("/register", validateRequest(registerUserSchema), registerUser);
router.post("/login", validateRequest(loginUserSchema), loginUser);
router.get("/profile", authHandler, authUser);

module.exports = router;
