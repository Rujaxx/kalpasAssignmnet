const express = require('express')

const { upload } = require('../controllers/upload')

const router = express.Router()

const { protect, authorize } = require('../middlewares/auth')

router.route('/upload').post(protect,authorize('admin'),upload)

module.exports = router