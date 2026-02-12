const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    currency: {
      type: String,
      default: "INR",
      uppercase: true,
    },

    images: [
      {
        type: String,
        required: true,
      },
    ],

    stock: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  { timestamps: true }
);


const ProductModel = mongoose.model("product", productSchema);

module.exports = ProductModel
