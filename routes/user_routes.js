const router = require('express').Router()
const UserController = require('../controllers/user_controller')

router.post('/register', UserController.registerUser)
router.post('/login', UserController.login)

module.exports = router