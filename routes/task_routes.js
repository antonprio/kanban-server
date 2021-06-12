const router = require('express').Router()
const TaskController = require('../controllers/task_controller')
const { authorize } = require('../middlewares/auth')

router.get('/', TaskController.getTasks)
router.get('/:id', TaskController.getTasks)
router.post('/', TaskController.createTask)
router.delete('/:id', authorize, TaskController.deleteTask)
router.put('/:id', authorize, TaskController.putTask)
router.patch('/:id', authorize, TaskController.patchTask)

module.exports = router