const express = require("express");
const {
  createTaskSchema,
  getAllTasksSchema,
  updateTaskSchema,
  moveTaskSchema,
  getTaskSchema,
  getAllTasksByBoardIdSchema,
} = require("../validation-schemas/taskSchema");
const {
  createTask,
  getAllTasks,
  deleteTask,
  moveTask,
  updateTask,
  getTaskById,
  getAllTasksByBoardId,
} = require("../controllers/taskController");
const validateRequest = require("../middlewares/validationHandler");
const authHandler = require("../middlewares/authHandler");
const router = express.Router();

router.get(
  "/get/:column_id",
  validateRequest(getAllTasksSchema, "params"),
  authHandler,
  getAllTasks
);
router.get(
  "/get/byid/:task_id",
  validateRequest(getTaskSchema, "params"),
  authHandler,
  getTaskById
);
router.post(
  "/create",
  validateRequest(createTaskSchema),
  authHandler,
  createTask
);
router.put(
  "/update",
  validateRequest(updateTaskSchema),
  authHandler,
  updateTask
);
router.patch("/move", validateRequest(moveTaskSchema), authHandler, moveTask);
router.delete(
  "/delete/:task_id",
  validateRequest(getTaskSchema, "params"),
  authHandler,
  deleteTask
);
router.get(
  "/get",
  validateRequest(getAllTasksByBoardIdSchema, "query"),
  authHandler,
  getAllTasksByBoardId
);

module.exports = router;
