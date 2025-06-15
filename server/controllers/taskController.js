const { default: mongoose } = require("mongoose");
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

const getAllTasksByBoardId = async (req, res, next) => {
  try {
    const board_id = req.query.board_id;
    // Step 1: Find all columns for this board
    // const columns = await Column.find({ board_id });

    // const columnIds = columns.map((col) => col._id);

    // Step 2: Find all tasks in those columns
    // const tasks = await Task.find({ column_id: { $in: columnIds } });
    const tasks = await Task.aggregate([
      {
        $lookup: {
          from: "columns", // name of the column collection
          localField: "column_id",
          foreignField: "_id",
          as: "columnInfo",
        },
      },
      {
        $unwind: "$columnInfo", // flatten the array
      },
      {
        $match: {
          "columnInfo.board_id": new mongoose.Types.ObjectId(board_id),
        },
      },
      {
        $project: {
          title: 1,
          description: 1,
          dueDate: 1,
          priority: 1,
          order: 1,
          color: 1,
          createdAt: 1,
          updatedAt: 1,
          // include column_id or _id if needed
          column_id: 1,
          // pick only required fields from columnInfo
          board_id: "$columnInfo.board_id",
          // columnInfo: {
          //   _id: "$columnInfo._id",
          //   title: "$columnInfo.title",
          // },
        },
      },
      {
        $sort: { order: 1 },
      },
    ]);

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

    res.status(200).json({ data: task, message: "Task Fetched Successfully." });
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
    const taskCount = await Task.countDocuments({ column_id });
    const task = new Task({
      title,
      description,
      dueDate,
      priority,
      column_id,
      order: taskCount,
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
    const { task_id, column_id, position } = req.body;
    const task = await Task.findById(task_id);

    if (task) {
      const fromColumnId = task.column_id;
      // 1. Remove from old column
      await Task.updateMany(
        { column_id: fromColumnId, order: { $gt: task.order } },
        { $inc: { order: -1 } }
      );

      // 2. Shift in new column
      await Task.updateMany(
        { column_id: column_id, order: { $gte: position } },
        { $inc: { order: 1 } }
      );
      // 3. Update current task
      task.column_id = column_id;
      task.order = position;
      await task.save();
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
    const task = await Task.findById(task_id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const { column_id, order } = task;

    // 1. Delete the task
    await task.deleteOne();

    // 2. Decrement order of tasks below the deleted one in the same column
    await Task.updateMany(
      { column_id, order: { $gt: order } },
      { $inc: { order: -1 } }
    );

    res.status(200).json({ message: "Task deleted and order updated" });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  moveTask,
  deleteTask,
  getAllTasksByBoardId,
};
