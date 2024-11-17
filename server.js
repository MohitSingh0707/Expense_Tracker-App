const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const colors = require('colors');
const connectDb = require('./config/connectDb');

// Config dotenv file
dotenv.config();

// database call
connectDb();

// Rest object
const app = express();

// Middlewares
app.use(morgan('dev'));
app.use(express.json()); // Fixed typo
app.use(cors());

// Routes
app.get("/", (req, res) => {
    res.send("<h1>Hello from server</h1>"); // Fixed HTML syntax
});

// Port
const PORT = process.env.PORT || 8080; // Correct order for default value

// Listen
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`.green);
});
