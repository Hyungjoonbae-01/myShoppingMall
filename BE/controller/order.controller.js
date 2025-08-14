const orderController = {};
const Order = require("../model/Order");
const Cart = require("../model/Cart");
const productController = require("./product.controller");
const mongoose = require("mongoose");
const randomStringGenerator = require("../utils/randomStringGenerator");
const PAGE_SIZE = 3;

orderController.createOrder = async (req, res) => {
  const session = await mongoose.startSession();
  try {
    await session.startTransaction();
    // 프론트엔드에서 데이터 보낸거 받아와 userId, totalPrice, shipTo, contact, orderList
    const { userId } = req;
    const { shipTo, contact, totalPrice, orderList } = req.body;
    //order를 만들자!
    const insufficientStockItems = await productController.checkItemListStock(
      orderList,
      { session }
    );
    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.reduce((total, item) => {
        return (total += item.message);
      }, "");
      await session.abortTransaction();
      throw new Error(errorMessage);
    }
    await Cart.findOneAndUpdate(
      { userId },
      { $set: { items: [] } },
      { new: true }
    ).catch((err) => console.error("Cart is not cleared successfully.", err));

    const newOrder = new Order({
      userId,
      totalPrice,
      shipTo,
      contact,
      items: orderList,
      orderNum: randomStringGenerator(),
    });

    await newOrder.save();
    await session.commitTransaction();
    res.status(200).json({ status: "success", orderNum: newOrder.orderNum });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  } finally {
    session.endSession();
  }
};

orderController.getOrder = async (req, res) => {
  try {
    const { page, ordernum } = req.query;
    const cond = ordernum
      ? { orderNum: { $regex: ordernum, $options: "i" } }
      : {};
    let query = Order.find(cond)
      .populate("items.productId", "name")
      .populate("userId", "email");
    let response = { status: "success" };
    if (page) {
      query.skip((page - 1) * PAGE_SIZE).limit(PAGE_SIZE);
      const totalItemNum = await Order.countDocuments(cond);
      const totalPageNum = Math.ceil(totalItemNum / PAGE_SIZE);
      response.totalPageNum = totalPageNum;
    }
    const orderList = await query.exec();
    response.data = orderList;
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

orderController.getOrderByUserId = async (req, res) => {
  try {
    const { userId } = req;
    const orders = await Order.find({ userId }).lean();
    if (!orders) {
      throw new Error("Fail to find the orders by user Id.");
    }
    res.status(200).json({ status: "success", data: orders });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

orderController.updateOrder = async (req, res) => {
  try {
    const { id } = req.params; // from /order/:id
    const { status } = req.body;

    if (!status) {
      return res
        .status(400)
        .json({ status: "fail", message: "Status is required" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true } // return updated doc
    )
      .populate("items.productId", "name")
      .populate("userId", "email");

    if (!updatedOrder) {
      return res
        .status(404)
        .json({ status: "fail", message: "Order not found" });
    }

    res.status(200).json({ status: "success", data: updatedOrder });
  } catch (error) {
    res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = orderController;
