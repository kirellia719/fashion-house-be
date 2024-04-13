const mongoose = require("mongoose");

const FashionSchema = new mongoose.Schema(
  {
    category: String,
    name: String,
    color: String,
    image: String,
    date: String,
    price: {
      type: String,
      default: 0,
    },
    owner: String,
    liked: {
      type: Boolean,
      default: false,
    },
    publicId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("fashions", FashionSchema);
