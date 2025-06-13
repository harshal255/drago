const Column = require("../models/Column");
const Task = require("../models/Task");

const getAllTasks = async (req, res, next) => {
  try {
    const column_id = req.params.column_id;
    const tasks = await Task.find({ column_id });

    res
      .status(200)
      .json({ data: tasks, message: "Tasks Fetched Successfully." });
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task_id = req.params.task_id;
    const task = await Task.findById(task_id);

    res
      .status(200)
      .json({ data: task, message: "Task Fetched Successfully." });
  } catch (error) {
    next(error);
  }
};
const createTask = async (req, res, next) => {
  try {
    const { column_id, title, description, dueDate, priority } = req.body;
    const column = await Column.findById(column_id);
    if (!column) {
      res.status(404).json({ data: {}, message: "Column Not Found" });
    }

    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      column_id,
    });
    const newTask = await task.save();
    res
      .status(200)
      .json({ data: newTask, message: "Task created Successfully." });
  } catch (error) {
    next(error);
  }
};
const updateTask = async (req, res, next) => {
  try {
    const { task_id, title, description, dueDate, priority } = req.body;

    const task = await Task.findById(task_id);

    if (task) {
      task.title = title || task.title;
      task.description = description || task.description;
      task.dueDate = dueDate || task.dueDate;
      task.priority = priority || task.priority;

      const updatedTask = await task.save();
      res
        .status(200)
        .json({ data: updatedTask, message: "Task Updated Successfully." });
    } else {
      res.status(200).json({ data: {}, message: "Task Not Found." });
    }
  } catch (error) {
    next(error);
  }
};

const moveTask = async (req, res, next) => {
  try {
    const { task_id, column_id } = req.body;

    const task = await Task.findById(task_id);

    if (task) {
      task.column_id = column_id;
      const updatedTask = await task.save();
      res
        .status(200)
        .json({ data: updatedTask, message: "Task Move Successfully." });
    } else {
      res.status(200).json({ data: {}, message: "Task Not Found." });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  const task_id = req.params.task_id;
  try {
    await Task.findByIdAndDelete(task_id);

    res.status(200).json({ data: task_id, message: "Task Deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createTask, getAllTasks,getTaskById, updateTask, moveTask, deleteTask };
