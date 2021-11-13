const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc Get all Users
// @route GET /api/v1/users
// @access Private
exports.getUsers = asyncHandler(async(req,res,next) => {
    const users = await User.find()

    res.status(200).json({ success : true, count : users.length , data : users})
})

// @desc Get single user
// @route GET /api/v1/users/:id
// @access Private
exports.getUser = asyncHandler(async(req,res,next) => {
    const user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorResponse("User not Found",404))
    }

    res.status(201).json({ success :true , data : user})
})

// @desc update single user
// @route PATCH /api/v1/cars/:id
// @access Private
exports.updateUser = asyncHandler(async(req,res,next) => {
    let user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorResponse("User not Found",404))
    }

    user = await User.findByIdAndUpdate(req.params.id,req.body,{ new : true, runValidators : true})

    res.status(200).json({ success : true, data : user})
})

// @desc Delete single user
// @route DELETE /api/v1/users/:id
// @access Private
exports.deleteUser = asyncHandler(async(req,res,next) => {
    let user = await User.findById(req.params.id)

    if(!user){
        return next(new ErrorResponse("User not Found",404))
    }

    user.remove()

    res.status(200).json({ success : true, data : {}})
})


