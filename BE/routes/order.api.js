const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const orderController = require("../controller/order.controller");

router.post("/", authController.authenticate, orderController.createOrder);
router.get("/", authController.authenticate, orderController.getOrder);
router.get(
  "/user",
  authController.authenticate,
  orderController.getOrderByUserId
);

router.put("/:id", authController.authenticate, orderController.updateOrder);

module.exports = router;
