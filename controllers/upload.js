const Car = require('../models/Car')
const csv = require('fast-csv')

// @desc Upload csv file
// @route POST /api/v1/upload
// @access PRIVATE
exports.upload = async(req,res,next) => {
    if(!req.files){
        res.status(400).json({ success : false, message : 'Please add a file'})
    }

    const files = req.files.file;

    // // Make sure file is a CSV
    if(!files.mimetype.endsWith("csv")){
       res.status(400).json({ success : false , message : "Please upload CSV file only"})
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
}