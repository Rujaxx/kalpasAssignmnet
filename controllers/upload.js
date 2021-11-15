const Car = require('../models/Car')
const csv = require('fast-csv')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc Upload csv file
// @route POST /api/v1/upload
// @access PRIVATE
exports.upload = asyncHandler(async(req,res,next) => {
    if(!req.files){
        return next( new ErrorResponse ('Please add a file',400))
    }

    const files = req.files.file;

    // // Make sure file is a CSV
    if(!files.mimetype.endsWith("csv")){
        return next( new ErrorResponse ('Please add a csv file',400))
    }

    const cars = []

    console.log(files)

    csv.parseFile(files.tempFilePath,{
        headers: true,
        trim: true,
        ignoreEmpty: true
    })
    .on('error', error => console.error(error))
    .on('data', data => cars.push(data))
    .on('end', async function () {
        await Car.create(cars)
        res.status(201).json({ success : true, count : cars.length ,message : 'Data uploaded succefully'})
    })    
})