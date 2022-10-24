const mongoose = require('mongoose')

const Schema = mongoose.Schema

const toDoTaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: String,
        format: Date,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('toDoTask', toDoTaskSchema)

