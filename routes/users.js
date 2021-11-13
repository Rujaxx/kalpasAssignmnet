const express = require('express')

const { getUsers, getUser, updateUser, deleteUser } = require('../controllers/users')

const router = express.Router()

const { protect, authorize} = require('../middlewares/auth')

router.route('/').get(protect,authorize('user','admin'),getUsers)

router.route('/:id')
.get(protect,authorize('user','admin'),getUser)
.patch(protect,authorize('user','admin'),updateUser)
.delete(protect,authorize('user','admin'),deleteUser)

module.exports = router