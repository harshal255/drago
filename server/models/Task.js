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
  order: { type: Number, required: true },
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
  if (this.isNew) {
    let color;
    while (true) {
      // Generate RGB values within a reasonable range (to avoid white & black)
      const r = Math.floor(Math.random() * 156) + 50; // 50-205
      const g = Math.floor(Math.random() * 156) + 50;
      const b = Math.floor(Math.random() * 156) + 50;

      // Convert to hex and combine
      color =
        "#" +
        [r, g, b]
          .map((val) => val.toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase();

      // Optionally, add more filters if needed (e.g., specific color exclusions)
      if (color !== "#FFFFFF" && color !== "#000000") break;
    }

    this.color = color;
  }

  next();
});

module.exports = mongoose.models.Task || mongoose.model("Task", TaskSchema);
