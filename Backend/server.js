require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const expenseRoutes= require('./routes/expenses')


const app = express()

app.use(express.json())

app.use((req,res,next)=>{
    console.log(req.path,req.method)
    next()
})

app.use('/api/expenses',expenseRoutes)

mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        app.listen(process.env.PORT,()=> {
            console.log('connected to Db & listening on 4000!')
        })
    })
    .catch((error)=>{
        console.log('error occured')
        console.log(error)
    })

