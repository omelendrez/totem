const express = require('express')
const router = express.Router()

router.post('/', (req, res) => {
  res.status(201).json({action: 'Posting order'})
})

module.exports = router