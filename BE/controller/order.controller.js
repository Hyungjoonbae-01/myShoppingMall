const orderController = {};
const Order = require("../model/Order");
const Cart = require("../model/Cart");
const productController = require("./product.controller");
const randomStringGenerator = require("../utils/randomStringGenerator");

orderController.createOrder = async (req, res) => {
  try {
    // 프론트엔드에서 데이터 보낸거 받아와 userId, totalPrice, shipTo, contact, orderList
    const { userId } = req;
    const { shipTo, contact, totalPrice, orderList } = req.body;
    //order를 만들자!
    const insufficientStockItems = await productController.checkItemListStock(
      orderList
    );
    if (insufficientStockItems.length > 0) {
      const errorMessage = insufficientStockItems.reduce((total, item) => {
        return (total += item.message);
      }, "");
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
    res.status(200).json({ status: "success", orderNum: newOrder.orderNum });
  } catch (error) {
    return res.status(400).json({ status: "fail", message: error.message });
  }
};

module.exports = orderController;
