import express, { Request, Response } from "express";
import dotenv from "dotenv";
import connectToDb from "./utils/connectToDb";
import authRoutes from "./routes/authRoutes";

// Load the .env file
dotenv.config();

// Get the port number from .env
const PORT = process.env.PORT;

const app = express();

// Use built in express middleware to parse request body as json
app.use(express.json());

// Connect to MongoDB
connectToDb();

/* 
    Reset Password Page
    TEMPORARY: WILL BE REPLACED BY A REACT PAGE
*/
app.get("/reset-password", (req, res) => {

    const html = `
    
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Reset Password</title>
    </head>
    <body>
        <form id="resetPasswordForm" action="/reset-password" method="POST">
            <div class="form-group">
                <label for="newPassword">New Password:</label>
                <input type="password" id="newPassword" name="newPassword" required>
            </div>
            <div class="form-group">
                <label for="confirmPassword">Confirm Password:</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required>
            </div>
            <button type="submit">Reset Password</button>
        </form>
    </body>
    </html>


    `;

    res.send(html);

});

// Add auth routes
app.use("/api/auth", authRoutes);

// End test route

app.listen(PORT, () => {

    console.log(`Listening on port ${PORT}`);

});