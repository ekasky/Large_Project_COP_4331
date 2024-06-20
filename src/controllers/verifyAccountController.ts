import { Request, Response } from "express";
import jsonwebtoken from "jsonwebtoken";
import { User } from "../model/User";
import { requestLogger } from "../utils/logger";

const verifyAccountController = async (req:Request, res:Response) => {

    const JWT_TOKEN = process.env.JWT_PRIVATE_KEY as string;

    // Get the verificartion token from the url
    const token = req.query.token as string;
    
    if(!token) {

        requestLogger(req, 'No verification token was sent in request', 'ERROR');

        return res.status(400).json({
            message: 'No verification token was sent in request'
        });

    }

    // Verify the token sent
    let decoded;
    try {

        decoded = jsonwebtoken.verify(token, JWT_TOKEN, {
            maxAge: 15 * 60
        }) as { email: string };

    }
    catch(error) {

        requestLogger(req, 'Expired or invalid verification token', 'ERROR');

        return res.status(400).json({
            message: 'Expired or invalid verification token'
        });

    }

    // Find the user's docuemnt by email
    try {

        const user = await User.findOne({email: decoded.email});

        // Handle case where user does not exist
        if(!user) {

            requestLogger(req, 'User not found for verification token', 'ERROR');

            return res.status(404).json({
                message: 'User not found for verification token'
            });

        }

        // Handle case where user is alreay verified
        if(user.emailVerified) {

            requestLogger(req, `User ${user.email} is already verified`, 'INFO');

            return res.status(200).json({
                message: 'User is already verified'
            });

        }

        // Update the user's email status
        user.emailVerified = true;
        await user.save();

        requestLogger(req, `User ${user.email} has been verified`, 'INFO');

        return res.status(200).json({
            message: 'Account verified successfully'
        });

    }
    catch(error:any) {

        requestLogger(req, `Error finding or updating user: ${error.message}`, 'ERROR');

        return res.status(500).json({
            message: 'Internal Server Error'
        });

    } 


}

export default verifyAccountController;