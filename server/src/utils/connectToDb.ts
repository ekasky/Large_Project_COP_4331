import mongoose from "mongoose";


const connectToDb = async() => {

    const URI = process.env.URI as string;

    try {

        await mongoose.connect(URI);
        console.log("Connected to db");

    }
    catch(error) {

        console.error(`Error connecting to db: ${error}`);

    }

};

export default connectToDb;