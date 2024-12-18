const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');

// Config dotenv file
dotenv.config();

// Database call
connectDb();

// Rest object
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // Fixed typo
app.use(cors({
    origin: 'http://localhost:3000', // Frontend URL
}));

// Routes
// User routes
app.use('/api/v1/users', require('./routes/userRoute'));

// Transaction routes
app.use('/api/v1/transactions', require('./routes/transactionRoutes')); // Fixed route path

// Port
const PORT = process.env.PORT || 8080; // Correct order for default value

// Listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.green);
});
