import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDb from "./utils/connectToDb";
import authRoutes from "./routes/authRoutes";
import logger from "./utils/logger";

// Load the .env file
dotenv.config();

// Get the port number from .env
const PORT = process.env.PORT;

const app = express();

// Use built in express middleware to parse request body as json
app.use(express.json());

// Connect to MongoDB
connectToDb();

// Add auth routes
app.use("/api/auth", authRoutes);

// End test route

app.listen(PORT, () => {

    logger(`Listening on port ${PORT}`);

});