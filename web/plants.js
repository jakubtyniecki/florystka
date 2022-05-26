const express = require('express')
const plantService = require('./plantService')

const router = express.Router()

router
    .route('/:plantName')
    .get(function(req, res) {
        const plant = plantService.reading(param => {
            return plantService.get_plant(param, req.params['plantName'])
        })

        res.render('plants', { data: plant })
    })

router
    .route('/:plantName')
    .post(function(req, res) {
        const plants = plantService.writing(param => {
            plantService.add_entry(param, req.body)
        })

        const plant = plantService.get_plant(plants, req.params['plantName'])

        res.render('plants', { data: plant })
    })

router
    .route('/:plantName')
    .put(function(req, res) {
        const plants = plantService.writing(param => {
            switch(req.body.action) {
            case 'change-entry':
                plantService.change_entry(param, req.body)
                break;
            case 'change-plant':
                plantService.change_plant(param, req.body)
                break;
            } 
        })

        const plant = plantService.get_plant(plants, req.params['plantName'])

        res.render('plants', { data: plant })
    })

router
    .route('/:plantName')
    .delete(function(req, res) {
        plantService.writing(param => {
            plantService.remove_plant(param, req.body)
        })

        res.redirect('/')
    })

module.exports = router
