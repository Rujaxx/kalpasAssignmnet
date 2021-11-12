const User = require('../models/User')
const asyncHandler = require('../middlewares/async')
const ErrorResponse = require('../utils/errorResponse')

// @desc Register
// @route POST /api/v1/auth/register
// @access Public
exports.register = asyncHandler( async(req,res,next) => {
    const { name, email, password, role} = req.body

    //Create User
    const user = await User.create({ name, email, password, role})

    sendTokenResponse(user, 200, res)
})

// @desc login
// @route POST /api/v1/auth/login
// @access Public
exports.login = asyncHandler( async(req,res,next) => {
    const { email, password } = req.body

    if(!email || !password){
        return next( new ErrorResponse('Please valid credentials',400))
    }

    const user = await User.findOne({email}).select('+password')

    //Check User
    if(!user){
        return next( new ErrorResponse('User not found',404))
    }

    //Match password
    const isMatch = await user.matchPassword(password)

    if(!isMatch){
        return next( new ErrorResponse('Invalid Credentials',400))
    }

    sendTokenResponse(user, 200, res)
})


// @desc logout
// @route GET /api/v1/auth/logout
// @access Public
exports.logout = asyncHandler(async (req, res, next) => {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    })
  
    res.status(200).json({
      success: true,
      data: {}
    })
})


// Send token response
const sendTokenResponse = (user, statusCode, res) => {
    //Get Signed JWT token
    const token = user.getSignedJwtToken()

    const options = {
        expires : new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    })
}
