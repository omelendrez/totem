const basket = require("./controllers/basket");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
	console.log("%s %s %s", req.method, req.url, req.path);
	next();
});
router.get("/", basket.findAll);
router.post("/", basket.create);

module.exports = router;
