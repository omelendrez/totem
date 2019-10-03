"use strict"
const ccPayment = require("../controllers/cc_payment")
const express = require("express")
const router = express.Router()

router.get("/", ccPayment.findAll)
router.post("/", ccPayment.create)
module.exports = router
