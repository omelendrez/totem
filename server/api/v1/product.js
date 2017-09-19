const product = require("./controllers/product");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
	console.log("%s %s %s", req.method, req.url, req.path);
	next();
});
router.get("/:id/category", product.findByCategory);
router.get("/:id", product.findById);
router.get("/", product.findAll);
router.post("/", product.create);
router.delete("/:id", product.delete);

module.exports = router;
