const express = require('express')
const dotenv = require('dotenv')
const fileUpload = require('express-fileupload')

//Load Env vars
dotenv.config({ path : './config/config.env'})

//Connect DB
const connectDB = require('./config/db')
connectDB()

//Route file
const upload = require('./routes/upload')

const app = express()

//Body-parser
app.use(express.json())

//File-upload
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))

//Mount routes
app.use('/api/v1', upload)

//Port
const PORT = process.env.PORT || 3000

const server = app.listen(PORT,console.log(`Server listening at ${PORT}`))