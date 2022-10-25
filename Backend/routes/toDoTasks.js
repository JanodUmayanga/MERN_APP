const express = require('express')

const {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
} = require('../controllers/toDoController')
const requireAuth = require('../middleware/requireAuth')

const router = express.Router()

//require auth for all routes
router.use(requireAuth)

//GET all tasks
router.get('/', getTasks)

//GET a single task
router.get('/:id', getTask)

//POST a new task
router.post('/', createTask)

//DELETE a task
router.delete('/:id', deleteTask)

//UPDATE a task
router.patch('/:id', updateTask)

module.exports = router