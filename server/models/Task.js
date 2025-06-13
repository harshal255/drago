const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema({
  column_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Column",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: Number,
    enum: [0, 1, 2],
    default: 1,
  },
  color: {
    type: String,
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

TaskSchema.pre("save", function (next) {
  // Modify the document or perform additional tasks
  this.color = "#" + Math.floor(Math.random() * 16777215).toString(16);
  next();
});

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);
