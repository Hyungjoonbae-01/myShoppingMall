const mongoose = require("mongoose");
const Product = require("./Product");
const User = require("./User");
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    status: { type: String, default: "preparing" },
    totalPrice: { type: Number, requried: true, default: 0 },
    shipTo: { type: Object, required: true },
    contact: { type: Object, required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    orderNum: { type: String, required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
        qty: { type: Number, required: true, default: 1 },
        size: { type: String, required: true },
        price: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

orderSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.__v;
  return obj;
};

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
