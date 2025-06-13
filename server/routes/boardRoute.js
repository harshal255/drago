const express = require("express");
const {
  createBoard,
  updateBoard,
  deleteBoard,
  getBoards,
} = require("../controllers/boardController");
const {
  createBoardSchema,
  updateBoardSchema,
  deleteBoardSchema,
} = require("../validation-schemas/boardSchema");
const authHandler = require("../middlewares/authHandler");
const validateRequest = require("../middlewares/validationHandler");
const router = express.Router();

router.get("/get", authHandler, getBoards);

router.post(
  "/create",
  validateRequest(createBoardSchema),
  authHandler,
  createBoard
);

router.put(
  "/update",
  validateRequest(updateBoardSchema),
  authHandler,
  updateBoard
);

router.delete(
  "/delete/:board_id",
  validateRequest(deleteBoardSchema, "params"),
  authHandler,
  deleteBoard
);

module.exports = router;
