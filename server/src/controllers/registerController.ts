import { Request, Response } from "express";
import checkRequiredFields from "../utils/checkRequiredFields";
import checkEmailFormat from "../utils/checkEmailFormat";
import checkPasswordStrength from "../utils/checkPasswordStrength";

const registerController = async (req:Request, res:Response) => {

    // Extract the request body from the request
    const {first_name, last_name, email, username, password}:{first_name: string, last_name:string, email:string, username:string, password:string} = req.body;

    // Check if the required fields are present in the request body
    const missing = checkRequiredFields(req, ["first_name", "last_name", "email", "username", "password"]);

    if(missing !== null) {

        return res.status(400).json({
            message: "Missing required fields",
            missing: missing
        });

    }

    // Check if email is valid format
    if(!checkEmailFormat(email)) {

        return res.status(400).json({
            message: "Invalid email address format"
        });

    }

    // Check the strength of the password
    if(!checkPasswordStrength(password)) {

        return res.status(400).json({
            message: "Password weak",
            mustContain: {
                length: 8,
                lowerCase: 1,
                upperCase: 1,
                number: 1,
                symbol: 1
            }
        });

    }

    // Check if email address is already in use

};

export default registerController;