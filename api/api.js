const express = require('express')
const fs = require('fs')
const path = require('path')

const router = express.Router()

const getPlants = async (req, res, next) => {
  try {
    //JSON.parse(data)
    
    const data = [
      {'plant1': 'name1'},
      {'plant2': 'name2'},
    ]

    res.json(data)
  } catch (e) {
    next(e);
  }
}

router
  .route('/v1/plants')
  .get(getPlants)

module.exports = router
