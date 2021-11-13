const express = require('express')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')
const cookieParser = require('cookie-parser')
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