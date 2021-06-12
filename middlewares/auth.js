const { decodePayload } = require('../helpers/jwt')
const CustomError = require('./error_handler')
const { User, Task } = require('../models')

const authenticate = async (req, res, next) => {
    try {
        const token = req.headers.access_token || null
        const payload = decodePayload(token)
        const userId = payload.id
        const user = await User.findByPk(userId)

        if (!token) throw new CustomError('Unauthorized', 'Invalid Token')

        if (!user) throw new CustomError('NotFound', 'User Not Found')

        req.currentUser = {
            id: user.id
        }

        next()
    } catch (error) {
        next(error)
    }
}

const authorize = async (req, res, next) => {
    try {
        const taskId = req.params.id
        const task = await Task.findOne({
            where: { id: taskId }
        })
    
        if (!task) throw new CustomError('NotFound', `Task with id ${taskId} not found`)
        
        if (task.user_id !== req.currentUser.id) throw new CustomError('Unauthorized', 'You do not have permission')

        next()
    } catch (error) {
        next(error)
    }
}

module.exports = { authenticate, authorize }