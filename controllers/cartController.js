const CartModel = require("../models/cart.model");
const ProductModel = require("../models/product.model");

const addToCart = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID is required"
    });
  }

  // Check product exists
  const product = await ProductModel.findById(productId);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found"
    });
  }

  // Check cart exists
  let cart = await CartModel.findOne({ user: userId });

  // If cart does not exist → create
  if (!cart) {
    cart = await CartModel.create({
      user: userId,
      items: [{ product: productId, quantity: 1 }]
    });

    return res.status(201).json({
      success: true,
      message: "Cart created & product added",
      cart
    });
  }

  // Check if product already in cart
  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

 if (itemIndex > -1) {
  cart.items[itemIndex].quantity += 1;

  await cart.save();

  return res.status(200).json({
    success: true,
    message: "Product quantity increased",
    cart
  });
} else {
  cart.items.push({ product: productId, quantity: 1 });

  await cart.save();

  return res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart
  });
}

  res.status(200).json({
    success: true,
    message: "Product added to cart",
    cart
  });
};

const updateCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId, action } = req.body; 
  // action = "inc" OR "dec"

  if (!productId || !action) {
    return res.status(400).json({
      success: false,
      message: "Product ID and action required"
    });
  }

  const cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found"
    });
  }

  const itemIndex = cart.items.findIndex(
    item => item.product.toString() === productId
  );

  if (itemIndex === -1) {
    return res.status(404).json({
      success: false,
      message: "Product not in cart"
    });
  }

  if (action === "inc") {
    cart.items[itemIndex].quantity += 1;
  }

  if (action === "dec") {
    if (cart.items[itemIndex].quantity > 1) {
      cart.items[itemIndex].quantity -= 1;
    } else {
      return res.status(400).json({
        success: false,
        message: "Quantity cannot be less than 1"
      });
    }
  }

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Cart updated successfully",
    cart
  });
};

const removeCartItem = async (req, res) => {
  const userId = req.user.id;
  const { productId } = req.body;

  if (!productId) {
    return res.status(400).json({
      success: false,
      message: "Product ID required"
    });
  }

  const cart = await CartModel.findOne({ user: userId });

  if (!cart) {
    return res.status(404).json({
      success: false,
      message: "Cart not found"
    });
  }

  cart.items = cart.items.filter(
    item => item.product.toString() !== productId
  );

  await cart.save();

  res.status(200).json({
    success: true,
    message: "Product removed from cart",
    cart
  });
};




module.exports = { addToCart,updateCartItem,removeCartItem };
