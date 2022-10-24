const mongoose = require('mongoose')
const ToDoTask = require('../models/toDoTaskModel')

//GET all tasks
const getTasks = async (req,res) => {
    const tasks = await ToDoTask.find({}).sort({createdAt: -1})

    res.status(200).json(tasks)
}

//GET a single task
const getTask = async (req,res) => {
    const {id} = req.params
    const task = await ToDoTask.findById(id)

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( {error: 'Task not found'} )
    }

    if(!task) {
        return res.status(404).json( {error: 'Task not found'} )
    }

    res.status(200).json(task)
}

//POST a new task
const createTask = async (req, res) => {
    const {title, date} = req.body

    try{
        const toDoTask = await ToDoTask.create( {title,date} )
        res.status(200).json(toDoTask)
    } catch(error) {
        res.status(400).json( {error: error.message} )
    }
}

//DELETE a task
const deleteTask = async (req,res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( {error: 'Task not found'} )
    }

    const task = await ToDoTask.findOneAndDelete({_id: id})

    if(!task) {
        return res.status(400).json( {error: 'Task not found'} )
    }

    res.status(200).json(task)
}

//UPDATE a task
const updateTask = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json( {error: 'Task not found'} )
    }

    const task = await ToDoTask.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!task) {
        return res.status(400).json( {error: 'Task not found'} )
    }

    res.status(200).json(task)
}


module.exports = {
    getTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}