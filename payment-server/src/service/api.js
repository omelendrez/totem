"use strict"
const axios = require('axios')

module.exports = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  baseURL: 'http://127.0.0.1:8280/PosnetDeviceIntegrator/2.2.0'
})