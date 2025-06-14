const express = require("express");
const router = express.Router();
const validateRequest = require("../middlewares/validationHandler");
const { getAllColumns } = require("../controllers/columnController");
const { getAllColumnsSchema } = require("../validation-schemas/columnsSchema");
const authHandler = require("../middlewares/authHandler");

router.get(
  "/get/:board_id",
  validateRequest(getAllColumnsSchema, "params"),
  authHandler,
  getAllColumns
);

module.exports = router;
