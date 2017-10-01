"use strict";
const user = require("../controllers/user");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/:id", user.findById);
router.get("/", user.findAll);
router.post("/", user.create);
router.put("/:id", user.update);
router.delete("/:id", user.delete);

module.exports = router;