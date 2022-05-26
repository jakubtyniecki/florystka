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
            return plantService.add_entry(param, req.body)
        })

        const plant = plantService.get_plant(plants, req.params['plantName'])

        res.render('plants', { data: plant })
    })

router
    .route('/:plantName')
    .put(function(req, res) {
        let plant_name = req.params['plantName']

        let redirect = false

        const plants = plantService.writing(param => {
            switch(req.body.action) {
                case 'change-entry':
                    return plantService.change_entry(param, req.body)
                case 'change-plant':
                    plant_name = req.body.content
                    redirect = true
                    return plantService.change_plant(param, req.body)
            } 
        })

        if (redirect == true) {
            res.redirect(`/plants/${plant_name}`)
        }

        const plant = plantService.get_plant(plants, plant_name)

        res.render('plants', { data: plant })
    })

router
    .route('/:plantName')
    .delete(function(req, res) {
        plantService.writing(param => {
            return plantService.remove_plant(param, req.body)
        })

        res.redirect('/')
    })

module.exports = router
