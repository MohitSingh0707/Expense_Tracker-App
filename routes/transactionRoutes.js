const express = require('express')
const { addTransaction, getAllTransaction,editTransaction,deleteTransaction } = require('../controllers/transactionController')

// router object
const router = express.Router()

// routes
// add transaction post method
router.post('/add-transaction',addTransaction)

// get transaction
router.post('/get-transaction',getAllTransaction)

// edit transaction post method
router.post('/edit-transaction',editTransaction)

// delete transaction post method
router.post('/delete-transaction',deleteTransaction)

// exports router
module.exports = router