const express = require('express')
const path = require('path');

const router = express.Router()

router
  .route('/')
  .get(function(req, res) {
    res.render('admin')
  })

module.exports = router
