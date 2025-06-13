const mongoose = require("mongoose");

const Column = new mongoose.Schema({
  board_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Board",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  deletedAt: { type: Date },
});

module.exports =
  mongoose.models.Column || mongoose.model("Column", Column);
