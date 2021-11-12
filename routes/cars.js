const express = require('express')

const { getCars, getCar, addCar, updateCar, deleteCar } = require('../controllers/cars')

const router = express.Router()

router.route('/').get(getCars).post(addCar)

router.route('/:id').get(getCar).patch(updateCar).delete(deleteCar)

module.exports = router