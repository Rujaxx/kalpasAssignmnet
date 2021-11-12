const express = require('express')

const { upload } = require('../controllers/upload')

const router = express.Router()

router.route('/upload').post(upload)

module.exports = router