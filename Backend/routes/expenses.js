const express = require('express')
const {
    createExpense,
    getExpense,
    getExpenses,
    deleteExpense,
    updateExpense
}=require('../controllers/expenseController')

const router = express.Router()

//get expenses
router.get('/',getExpenses)

//get a single expense
router.get('/:id',getExpense)

//create an expense
router.post('/',createExpense)

//delete an expense
router.delete('/:id',deleteExpense)

//update an expense
router.patch('/:id',updateExpense)

module.exports= router