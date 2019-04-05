const express = require('express')
const multer = require('multer')
const logger = require('morgan')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage })

const app = express()

app.use(logger('dev'))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, OPTIONS, PUT, PATCH, DELETE'
  )
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
  res.setHeader('Access-Control-Allow-Credentials', true)
  next()
})

app.post('/image', upload.single('file'), function (req, res, next) {
  const fileName = req.file.filename
  res.status(200).json(fileName)
  next()
})

app.use(express.static('images'))

const port = process.env.PORT || 3010
app.listen(port)

console.log('Assets server started ' + port)
