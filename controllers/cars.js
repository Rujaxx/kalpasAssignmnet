const Car = require('../models/Car')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc Get all cars
// @route GET /api/v1/cars
// @access Public
exports.getCars = asyncHandler(async(req,res,next) => {
    let query = Car.find()

    // Sort fields
    if(req.query.sort){
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    }else{
        query = query.sort('-createdAt')
    }

    // Pagination
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 5;
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const total = await Car.countDocuments()

    query = query.skip(startIndex).limit(limit)

    const cars = await query

    // Pagination result
    const pagination = {}
    if(endIndex < total){
        pagination.next = {
            page : page + 1,
            limit
        }
    }

    if(startIndex > 0){
        pagination.prev = {
            page : page - 1,
            limit
        }
    }

    res.status(200).json({ success : true, count : cars.length ,pagination, data : cars})
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


