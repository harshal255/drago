const Column = require("../models/Column");

const getAllColumns = async (req, res, next) => {
  try {
    const board_id = req.params.board_id;
    const columns = await Column.find({ board_id });
    res
      .status(200)
      .json({ data: columns, message: "Columns Fetched Successfully." });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllColumns };
