const Board = require("../models/Board");
const Column = require("../models/Column");

const getBoards = async (req, res, next) => {
  const user_id = req.user._id;
  const boards = await Board.find({ user_id });
  res
    .status(200)
    .json({ data: boards, message: "Boards Fetched Successfully." });
};

const createBoard = async (req, res, next) => {
  try {
    const { title } = req.body;
    const user_id = req.user._id;

    const board = Board({ title, user_id });
    const newBoard = await board.save();

    //default columns like (todo,in process and done);
    const defaultColumns = [
      {
        title: "To Do",
        board_id: newBoard._id,
      },
      {
        title: "In Progress",
        board_id: newBoard._id,
      },
      {
        title: "Done",
        board_id: newBoard._id,
      },
    ];

    await Column.insertMany(defaultColumns);
    res
      .status(200)
      .json({ data: newBoard, message: "Board Created Successfully" });
  } catch (error) {
    next(error);
  }
};

const updateBoard = async (req, res, next) => {
  try {
    const { board_id, title } = req.body;
    const user_id = req.user._id;

    const updatedBoard = await Board.findByIdAndUpdate(board_id, { title });
    if (updatedBoard) {
      res
        .status(200)
        .json({ data: updatedBoard, message: "Board Updated Successfully" });
    } else {
      res.status(400).json({
        data: {},
        message: "board not found",
      });
    }
  } catch (error) {
    next(error);
  }
};

const deleteBoard = async (req, res, next) => {
  try {
    const { board_id } = req.params;
    await Board.findByIdAndDelete(board_id);
    await Column.deleteMany({ board_id });

    res
      .status(200)
      .json({ data: board_id, message: "Board Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

module.exports = { createBoard, updateBoard, deleteBoard, getBoards };
