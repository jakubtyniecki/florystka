const express = require('express')
const fs = require('fs')
const md5 = require('md5')
const path = require('path');

const plants_db = path.resolve(__dirname, '../resources/plants.json')

var router = express.Router()

function add_entry(plants, data) {
  for (const plant of plants) {
    if (plant.name == data.name) {
      plant.entries.push({
        "content": data.content, 
        'hash': md5(JSON.stringify([plant.name, data.content]))
      })
    }
  }
}

function change_entry(plants, data) {
  for (const plant of plants) {
    if (plant.name == data.name) {
      for (let entry of plant.entries) {
        if (entry.hash == data.hash) {
          entry.content = data.content
          entry.hash = md5(JSON.stringify([plant.name, data.content]))
        }
      }
    }
  }
}

function add_plant(plants, data) {
  plants.push({
    'name': data.content,
    'entries': []
  })

  return plants
}

function process(callback) {
  const read_plants_str = fs.readFileSync(plants_db)

  let plants = JSON.parse(read_plants_str)

  callback(plants)

  let write_plants_str = JSON.stringify(plants, null, 2);

  fs.writeFileSync(plants_db, write_plants_str)

  return plants
}

router
  .route('/')
  .get(function(req, res) {
    const read_plants_str = fs.readFileSync(plants_db)

    let plants = JSON.parse(read_plants_str)

    res.render('index', { data: plants })
  })

router
  .route('/')
  .post(function(req, res) {
    const plants = process(param => {
      switch(req.body.action) {
        case 'add-entry':
          add_entry(param, req.body)
          break;
        case 'add-plant':
          add_plant(param, req.body)
          break;
      } 
    })

    res.render('index', { data: plants })
  })

router
  .route('/')
  .put(function(req, res) {
    const plants = process(param => {
      change_entry(param, req.body)
    })

    res.render('index', { data: plants })
  })

module.exports = router
