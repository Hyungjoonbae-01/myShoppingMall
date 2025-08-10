const express = require("express");
const router = express.Router();
const authController = require("../controller/auth.controller");
const cartController = require("../controller/cart.controller");

router.post("/", authController.authenticate, cartController.addItemToCart);
router.get("/", authController.authenticate, cartController.getCart);
router.put("/:id", authController.authenticate, cartController.updateQty);
router.delete("/:id", authController.authenticate, cartController.deleteItem);

module.exports = router;
