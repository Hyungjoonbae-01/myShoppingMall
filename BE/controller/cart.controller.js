const cartController = {};
const Cart = require("../model/Cart");
const mongoose = require("mongoose");

cartController.addItemToCart = async (req, res) => {
  try {
    const { userId } = req;
    const { productId, size, qty } = req.body;
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId });
      await cart.save();
    }

    const existItem = cart.items.find(
      (item) => item.productId.equals(productId) && item.size === size
    );
    if (existItem) {
      throw new Error("Selected Item is already in the Cart.");
    }
    cart.items = [...cart.items, { productId, size, qty }];
    await cart.save();
    return res
      .status(200)
      .json({ status: "success", data: cart, cartItemQty: cart.items.length });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

cartController.getCart = async (req, res) => {
  try {
    const { userId } = req;
    const userCart = await Cart.findOne({ userId });
    if (!userCart) {
      return res.status(200).json({ status: "success", data: [] });
    }
    const cart = await userCart.populate({
      path: "items",
      populate: {
        path: "productId",
        model: "Product",
      },
    });

    res.status(200).json({ status: "success", data: cart.items });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

cartController.updateQty = async (req, res) => {
  try {
    const { userId } = req;
    const productId = req.params.id;
    const cart = await Cart.findOne({ userId });
    let response = { status: "success" };

    if (!mongoose.isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid productId" });
    }

    const pid = new mongoose.Types.ObjectId(productId);
    const { value, size } = req.body;
    const q = Number(value);
    const updated = await Cart.findOneAndUpdate(
      {
        userId,
        items: { $elemMatch: { productId: pid, size } }, // ensure both conditions match SAME element
      },
      { $set: { "items.$.qty": q } },
      { new: true }
    )
      .populate("items.productId")
      .lean();

    if (!updated) {
      return res
        .status(404)
        .json({ status: "fail", message: "Cart item not found" });
    }
    response.data = updated.items;
    response.qty = q;
    res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

cartController.deleteItem = async (req, res) => {
  try {
    const { userId } = req;
    const productId = req.params.id;
    const cart = await Cart.findOne({ userId });
    let response = { status: "success" };

    if (!mongoose.isValidObjectId(productId)) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid productId" });
    }

    const pid = new mongoose.Types.ObjectId(productId);
    const { size } = req.body;
    const updated = await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId: pid, size: size } } }, // <-- delete line
      { new: true }
    )
      .populate("items.productId")
      .lean();

    if (!updated) {
      return res
        .status(404)
        .json({ status: "fail", message: "Cart item not found" });
    }
    res.status(200).json({
      status: "success",
      data: updated.items,
    });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

cartController.removeCart = async (req, res) => {
  try {
  } catch (error) {}
};

module.exports = cartController;
