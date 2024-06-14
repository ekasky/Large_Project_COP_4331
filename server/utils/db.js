require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connectDB = async () => {

    try {

        const connection = await mongoose.connect(uri);

        console.log('DB connection successful');

    }
    catch(error) {

        console.error('Error connecting to MongoDB: ', error);

    }

};

module.exports = connectDB;