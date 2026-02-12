const ProductModel = require("../models/product.model")
const mongoose = require("mongoose");

// CREATE PRODUCT
const createProduct = async (req, res) => {
  const { name, description, price, stock } = req.body;

  if (!name || !description || !price || !stock) {
    const error = new Error("All fields are required");
    error.statusCode = 400;
    throw error;
  }

  const images = req.files ? req.files.map(file => file.filename) : [];

  const product = await ProductModel.create({
    name,
    description,
    price,
    stock,
    images
  });

  res.status(201).json({
    success: true,
    product
  });
};

// GET ALL
const getAllProducts = async (req, res) => {
  const products = await ProductModel.find();

  res.status(200).json({
    success: true,
    count: products.length,
    products
  });
};

// GET SINGLE
const getSingleProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    const error = new Error("Invalid Product ID");
    error.statusCode = 400;
    throw error;
  }

  const product = await ProductModel.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  res.status(200).json({
    success: true,
    product
  });
};

// UPDATE (PATCH)
const updateProduct = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  if (req.files && req.files.length > 0) {
    product.images = req.files.map(file => file.filename);
  }

  product.name = req.body.name || product.name;
  product.description = req.body.description || product.description;
  product.price = req.body.price || product.price;
  product.stock = req.body.stock || product.stock;

  await product.save();

  res.status(200).json({
    success: true,
    product
  });
};

// DELETE
const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const product = await ProductModel.findById(id);

  if (!product) {
    const error = new Error("Product not found");
    error.statusCode = 404;
    throw error;
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully"
  });
};

module.exports = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
