const express = require('express')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const helmet = require('helmet')
const hpp = require('hpp')
const xss = require('xss-clean')
const rateLimiter = require('express-rate-limit')
const mongoSanitize = require('express-mongo-sanitize')
const errorHandler = require('./middlewares/error')

//Load Env vars
dotenv.config({ path : './config/config.env'})

//Connect DB
const connectDB = require('./config/db')
connectDB()

//Route file
const upload = require('./routes/upload')
const cars = require('./routes/cars')
const auth = require('./routes/auth')
const users = require('./routes/users')

const app = express()

//Body-parser
app.use(express.json())

// Cookie Parser
app.use(cookieParser())

//File-upload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

// Mongo sanitize
app.use(mongoSanitize())

// Set security headers
app.use(helmet())

// Prevent XSS attacks
app.use(xss())

//Rate Limiting
const limiter = rateLimiter({
    windowMs : 10 * 60 * 1000, // 10 mins
    max : 100
})

app.use(limiter)

// Prevent HTTP param Pollution
app.use(hpp())

// Enable Cors
app.use(cors())

//Mount routes
app.use('/api/v1', upload)
app.use('/api/v1/cars', cars)
app.use('/api/v1/auth', auth)
app.use('/api/v1/users', users)

// ErrorHandler
app.use(errorHandler)

//Port
const PORT = process.env.PORT || 3000

const server = app.listen(PORT,console.log(`Server listening at ${PORT}`))