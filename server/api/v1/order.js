const order = require("./controllers/order");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
	console.log("%s %s %s", req.method, req.url, req.path);
	next();
});
router.get("/:id", order.findById);
router.get("/", order.findAll);
router.post("/", order.create);
router.delete("/:id", order.delete);

module.exports = router;
