"use strict"
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/totem', {useNewUrlParser: true})

mongoose.connection.once('open', ()=> {
  console.log('Connected')
})
.on('error', error => {
  console.log('Error found', error)
})
