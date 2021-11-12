const express = require('express')

const { getCars, getCar, addCar, updateCar, deleteCar } = require('../controllers/cars')

const router = express.Router()

const { protect, authorize} = require('../middlewares/auth')

router.route('/').get(protect,authorize('user','admin'),getCars).post(protect,authorize('admin'),addCar)

router.route('/:id').get(getCar).patch(updateCar).delete(deleteCar)

module.exports = router