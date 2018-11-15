"use strict";
const subCategory = require("../controllers/sub_category");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", subCategory.findById);
router.get("/", subCategory.findAll);
router.post("/", subCategory.create);
router.put("/:id", subCategory.update);
router.delete("/:id", subCategory.delete);

module.exports = router;
