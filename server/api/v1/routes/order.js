"use strict";
const order = require("../controllers/order");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.post("/", order.create);
router.get("/", order.findAll);
router.put("/:id", order.updateOrderStatus);
router.get("/orders", order.findOrders);
router.get("/items", order.findItems);
router.put("/items/:id", order.updateItemStatus);
router.get("/order_items", order.findOrderItems);
router.get("/order_turns", order.findOrderTurns);

module.exports = router;
