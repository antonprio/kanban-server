const router = require('express').Router()
const userRoutes = require('./user_routes')
const taskRoutes = require('./task_routes')
const { authenticate } = require('../middlewares/auth')

router.use('/users', userRoutes)
router.use('/tasks', authenticate, taskRoutes)

module.exports = router