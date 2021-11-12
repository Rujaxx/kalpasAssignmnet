const Car = require('../models/Car')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc Get all cars
// @route GET /api/v1/cars
// @access Public
exports.getCars = asyncHandler(async(req,res,next) => {
    const cars = await Car.find()

    res.status(200).json({ success : true, count : cars.length , data : cars})
})

// @desc Get single car
// @route GET /api/v1/cars/:id
// @access Public
exports.getCar = asyncHandler(async(req,res,next) => {
    const car = await Car.findById(req.params.id)

    if(!car){
        return next(new ErrorResponse("Car not Found",404))
    }

    res.status(201).json({ success :true , data : car})
})

// @desc add single car
// @route POST /api/v1/cars/:id
// @access Admin
exports.addCar = asyncHandler(async(req,res,next) => {
    const { model, mpg, cyl, disp, hp, drat, wt, qsec, vs, am, gear, carb} = req.body

    const car = await Car.create({ model, mpg, cyl, disp, hp, drat, wt, qsec, vs, am, gear, carb})

    res.status(200).json({ success : true, message : 'Car added'})
})

// @desc update single car
// @route PATCH /api/v1/cars/:id
// @access Admin
exports.updateCar = asyncHandler(async(req,res,next) => {
    let car = await Car.findById(req.params.id)

    if(!car){
        return next(new ErrorResponse("Car not Found",404))
    }

    car = await Car.findByIdAndUpdate(req.params.id,req.body,{ new : true, runValidators : true})

    res.status(200).json({ success : true, data : car})
})

// @desc Delete single car
// @route DELETE /api/v1/cars/:id
// @access Admin
exports.deleteCar = asyncHandler(async(req,res,next) => {
    let car = await Car.findById(req.params.id)

    if(!car){
        return next(new ErrorResponse("Car not Found",404))
    }

    car.remove()

    res.status(200).json({ success : true, data : {}})
})


