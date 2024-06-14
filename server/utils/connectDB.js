const mongoose = require('mongoose');

const uri = process.env.MONGO_URI;

const connectDB = async () => {

    try {

        await mongoose.connect(uri);

    }
    catch(error) {

        console.error('Error connecting to MongoDB: ', error);

    }

};

module.exports = connectDB;