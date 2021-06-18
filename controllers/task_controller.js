const ResponseHelper = require('../helpers/response_helper')
const CustomError = require('../middlewares/error_handler')
const { Task, User } = require('../models')

class TaskController {
    static async getTasks(req, res, next) {
        try {
            let tasks = null
            
            if (req.params.id) {
                tasks = await Task.findByPk(req.params.id, {
                    include: {
                        model: User,
                        attributes: ['id', 'email', 'full_name', 'img_url']
                    }
                })                
            } else {
                tasks = await Task.findAll({
                    order: [['id', 'asc']],
                    include: {
                        model: User,
                        attributes: ['id', 'email', 'full_name', 'img_url']
                    }
                })
            }
            if (!tasks) throw new CustomError('NotFound', 'Task not found')

            const response = new ResponseHelper('success', tasks)
            
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async createTask(req, res, next) {
        try {
            const { title, category, task_detail } = req.body
            const user_id = req.currentUser.id
            const newTask = await Task.create({
                title, category, user_id, task_detail
            })
            let response = null
            
            if (newTask) {
                response = new ResponseHelper('success create new task', newTask)
            }

            return res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async deleteTask(req, res, next) {
        try {
            let response = null
            const taskId = req.params.id
            const deletedTask = await Task.destroy({
                where: { id: taskId },
                returning: true
            })

            if (deletedTask) {
                response = new ResponseHelper(`Task with id ${taskId} deleted`, null)
            }

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async putTask(req, res, next) {
        try {
            let response = null
            const taskId = req.params.id
            const { title, category, task_detail } = req.body
            const task = await Task.update({
                title, category, task_detail
            }, {
                where: { id: taskId },
                returning: true
            })

            if (task) {
                response = new ResponseHelper('success update task', task[1])
            }
            
            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    static async patchTask(req, res, next) {
        try {
            let response = null
            const taskId = req.params.id
            const { category } = req.body
            const task = await Task.update({ category }, {
                where: { id: taskId },
                returning: true
            })

            if (task) {
                response = new ResponseHelper('success update category', task[1])
            }

            return res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TaskController