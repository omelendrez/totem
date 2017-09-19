const discount = require("../controllers/discount");
const express = require("express");
const router = express.Router();

router.use(function(req, res, next) {
	console.log("%s %s %s", req.method, req.url, req.path);
	next();
});
router.get("/:id", discount.findById);
router.get("/", discount.findAll);
router.post("/", discount.create);
router.delete("/:id", discount.delete);

module.exports = router;
