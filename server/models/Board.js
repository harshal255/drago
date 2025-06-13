const mongoose = require("mongoose");

const BoardSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  //for soft delete functionality
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  updatedAt: { type: Date, required: true, default: Date.now },
  deletedAt: { type: Date },
});

module.exports = mongoose.models.Board || mongoose.model("Board", BoardSchema);
