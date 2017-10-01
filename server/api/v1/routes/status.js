"use strict";
const status = require("../controllers/status");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/", status.findAll);
router.post("/", status.create);

module.exports = router;