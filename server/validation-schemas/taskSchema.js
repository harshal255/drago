const Joi = require("joi");

const getAllTasksSchema = Joi.object().keys({
  column_id: Joi.string().required(),
});
const getAllTasksByBoardIdSchema = Joi.object().keys({
  board_id: Joi.string().required(),
});

const createTaskSchema = Joi.object().keys({
  column_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  priority: Joi.number().valid(0, 1, 2),
});

const updateTaskSchema = Joi.object().keys({
  task_id: Joi.string().required(),
  title: Joi.string().required(),
  description: Joi.string().optional(),
  dueDate: Joi.date().optional(),
  priority: Joi.number().valid(0, 1, 2),
});

const moveTaskSchema = Joi.object().keys({
  task_id: Joi.string().required(),
  column_id: Joi.string().required(),
});

const getTaskSchema = Joi.object().keys({
  task_id: Joi.string().required(),
});

module.exports = {
  getAllTasksSchema,
  getAllTasksByBoardIdSchema,
  createTaskSchema,
  updateTaskSchema,
  moveTaskSchema,
  getTaskSchema,
};
