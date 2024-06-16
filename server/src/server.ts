import express, { Request, Response } from "express";
import dotenv from "dotenv";

// Load the .env file
dotenv.config();

// Get the port number from .env
const PORT = process.env.PORT;

const app = express();

// Test Route

app.get('/test', (req:Request, res:Response) => {

    res.send("Test");

});

// End test route

app.listen(PORT, () => {

    console.log(`Listening on port ${PORT}`);

});