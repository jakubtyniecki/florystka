const express = require('express')
const plantService = require('./plantService')

var router = express.Router()

router
    .route('/')
    .get(function(req, res) {
        const plants = plantService.reading(param => {
            return param
        })

        res.render('index', { data: plants })
    })

router
    .route('/')
    .post(function(req, res) {
        const plants = plantService.writing(param => {
            switch(req.body.action) {
                case 'add-entry':
                    plantService.add_entry(param, req.body)
                    break;
                case 'add-plant':
                    plantService.add_plant(param, req.body)
                    break;
            } 
        })

        res.render('index', { data: plants })
    })

router
    .route('/')
    .put(function(req, res) {
        const plants = plantService.writing(param => {
            plantService.change_entry(param, req.body)
        })

        res.render('index', { data: plants })
    })

module.exports = router
