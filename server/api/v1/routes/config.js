"use strict";
const config = require("../controllers/config");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
  console.log("%s %s %s", req.method, req.url, req.path);
  next();
});
router.get("/", config.getStatus);
router.put("/", config.aknowledge);

module.exports = router;
