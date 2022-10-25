require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const toDoTaskRoutes = require('./routes/toDoTasks')
const userRoutes = require('./routes/user')

//app
const app = express()

//middleware
app.use(express.json())

//rotes
app.use('/api/todotasks', toDoTaskRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        //listeninf for requests
        app.listen(process.env.PORT, () => {
            console.log("Listening on PORT", process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })