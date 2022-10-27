const Expense = require('../models/expenseModel')
const mongoose = require('mongoose')

//get all
const getExpenses= async (req,res)=>{
    const expenses = await Expense.find({}).sort({createdAt:-1})
    res.status(200).json(expenses)
}

//get single
const getExpense = async(req,res)=>{
    const {id}=req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Id is not valid'})
    }

    const expense= await Expense.findById(id)

    if (!expense){
        return res.status(404).json({error:'no workout'})
    }

    res.status(200).json(expense)
}

//create new
const createExpense= async (req,res)=> {
    const{bank,amount}=req.body

try{
    const expense=await Expense.create({bank,amount})
    res.status(200).json(expense)

} catch(error){
    res.status(400).json({error:error.mssg})

}}

//delete a one
const deleteExpense = async (req,res)=> {
    const {id}=req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Id is not valid'})
    }  
    
    const expense = await Expense.findOneAndDelete({_id:id})

    if (!expense){
        return res.status(404).json({error:'no such expense'})
    }

    res.status(200).json(expense)
}


//update one

const updateExpense =async (req,res)=> {
    const {id}=req.params 

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error:'Id is not valid'})
    }  
    
    const expense = await Expense.findOneAndUpdate({_id:id},{
        ...req.body
    })

    if (!expense){
        return res.status(404).json({error:'no such expense'})
    }

    res.status(200).json(expense)    
}


module.exports = {
    createExpense,
    getExpense,
    getExpenses,
    deleteExpense,
    updateExpense
}