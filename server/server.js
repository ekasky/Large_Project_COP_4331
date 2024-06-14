require('dotenv').config();
const express    = require('express');
const mongoose   = require('mongoose');
const connectDB  = require('./utils/connectDB');
const authRoutes = require('./routes/api/authRoutes');

const app     = express();
const port    = process.env.PORT;

// Connect to MongoDB
connectDB();

mongoose.connection.once('open', () => {

    console.log('Connected to db');

});

// Parse incoming requests as json
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);                       // Mount authRoutes at /api/auth endpoint

// Listen for all requests
app.listen(port, () => {

    console.log(`Server listening on port ${port}`);

});