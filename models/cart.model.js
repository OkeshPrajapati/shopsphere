const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "product",   // 👈 EXACT model name
    required: true
  },
  quantity: {
    type: Number,
    default: 1
  }
});

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",   // 👈 EXACT model name
      required: true
    },
    items: [cartItemSchema]
  },
  { timestamps: true }
);

module.exports = mongoose.model("CartModel", cartSchema);
