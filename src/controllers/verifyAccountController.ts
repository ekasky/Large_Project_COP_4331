import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../model/User";
import { requestLogger } from "../utils/logger";

const JWT_TOKEN = process.env.JWT_PRIVATE_KEY as string;

const verifyAccountController = async (req:Request, res:Response) => {

    // Get the verificartion token from the url
    const token = req.query.token as string;
    
    if(!token) {

        requestLogger(req, 'No token was sent with email verification attempt', 'ERROR');

    }

    /* 
    try {

        // Get the verificartion token from the url
        const token = req.query.token as string;

        // If there is no token send a error message
        if(!token) {

            return res.status(400).json({
                message: "No token was sent. Please try again or request a new verfication link."
            });

        }

        // Verify the token
        let decoded;
        try {
            decoded = jsonwebtoken.verify(token, JWT_TOKEN) as {
                email: string,
                exp: number
            };
        } catch (err) {
            return res.status(400).json({
                message: "Invalid token. Please request a new verification link."
            });
        }

        // Find the user and update the verification status
        const user = await User.findOneAndUpdate(
            {email: decoded.email},
            {emailVerified: true},
            {new: true}
        );

        if(!user) {

            return res.status(404).send("No user found. Please register and try again.");

        }

        // Return success message
        return res.status(200).json({
            message: "Account verified"
        });

    }
    catch(error) {

        console.error("Internal Server Error: ", error);
        res.status(500).send('Internal server error');

    }
    */

}

export default verifyAccountController;