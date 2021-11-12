const express = require('express')
const dotenv = require('dotenv')

//Load Env vars
dotenv.config({ path : './config/config.env'})

//Connect DB
const connectDB = require('./config/db')
connectDB()

const app = express()

//Port
const PORT = process.env.PORT || 3000

const server = app.listen(PORT,console.log(`Server listening at ${PORT}`))