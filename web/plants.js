const express = require('express')
const service = require('./service')

const router = express.Router()

router
    .route('/:plantName')
    .get(function(req, res) {
        const plant = service.reading(param => {
            return service.get_plant(param, req.params['plantName'])
        })

        res.render('plants', { data: plant })
    })



router
    .route('/:plantName')
    .post(function(req, res) {
        const plants = service.writing(param => {
            service.add_entry(param, req.body)
        })

        const plant = service.get_plant(plants, req.params['plantName'])

        res.render('plants', { data: plant })
    })

router
    .route('/:plantName')
    .put(function(req, res) {
        const plants = service.writing(param => {
            switch(req.body.action) {
            case 'change-entry':
                service.change_entry(param, req.body)
                break;
            case 'change-plant':
                service.change_plant(param, req.body)
                break;
            } 
        })

        const plant = service.get_plant(plants, req.params['plantName'])

        res.render('plants', { data: plant })
    })

router
    .route('/:plantName')
    .delete(function(req, res) {
        service.writing(param => {
            service.remove_plant(param, req.body)
        })

        res.redirect('/')
    })

module.exports = router
