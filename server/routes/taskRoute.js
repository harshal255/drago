const express = require("express");
const {
  createTaskSchema,
  getAllTasksSchema,
  updateTaskSchema,
  moveTaskSchema,
  getTaskSchema,
} = require("../validation-schemas/taskSchema");
const {
  createTask,
  getAllTasks,
  deleteTask,
  moveTask,
  updateTask,
  getTaskById,
} = require("../controllers/taskController");
const validateRequest = require("../middlewares/validationHandler");
const router = express.Router();

router.get(
  "/get/:column_id",
  validateRequest(getAllTasksSchema, "params"),
  getAllTasks
);
router.get(
  "/get/byid/:task_id",
  validateRequest(getTaskSchema, "params"),
  getTaskById
);
router.post("/create", validateRequest(createTaskSchema), createTask);
router.put("/update", validateRequest(updateTaskSchema), updateTask);
router.patch("/move", validateRequest(moveTaskSchema), moveTask);
router.delete(
  "/delete/:task_id",
  validateRequest(getTaskSchema, "params"),
  deleteTask
);

module.exports = router;
