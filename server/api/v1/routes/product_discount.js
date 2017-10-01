"use strict";
const productDiscount = require("../controllers/product_discount");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id/product", productDiscount.findByProductId);
router.get("/:id", productDiscount.findById);
router.get("/", productDiscount.findAll);
router.post("/", productDiscount.create);
router.delete("/:id", productDiscount.delete);

module.exports = router;