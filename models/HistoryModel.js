const mongoose = require("mongoose");

const HistorySchema = new mongoose.Schema(
  {
    date: String,
    clothes: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model("histories", HistorySchema);
