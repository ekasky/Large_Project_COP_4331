import mongoose from "mongoose";
import logger from "./logger";


const connectToDb = async() => {

    const URI = process.env.URI as string;

    try {

        await mongoose.connect(URI);
        logger("Connected to MongoDB Atlas");

    }
    catch(error) {

        logger(`Error connecting to db: ${error}`);

    }

};

export default connectToDb;