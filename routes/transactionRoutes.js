const express = require('express')
const { addTransaction, getAllTransaction } = require('../controllers/transactionController')

// router object
const router = express.Router()

// routes
// add transaction post method
router.post('/add-transaction',addTransaction)

// get transaction
router.get('/get-transaction',getAllTransaction)

// exports router
module.exports = router