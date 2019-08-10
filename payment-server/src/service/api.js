"use strict"
const axios = require('axios')

module.exports = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  baseURL: 'http://totem01:8280/PosnetDeviceIntegrator/2.2.0'
})