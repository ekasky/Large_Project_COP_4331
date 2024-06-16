import { Request, Response } from "express";
import bcrpyt from "bcrypt";
import checkRequiredFields from "../utils/checkRequiredFields";
import checkEmailFormat from "../utils/checkEmailFormat";
import checkPasswordStrength from "../utils/checkPasswordStrength";
import findUserByEmail from "../utils/findUserByEmail";
import findUserByUsername from "../utils/findUserByUsername";

const registerController = async (req:Request, res:Response) => {

    // Extract the request body from the request
    const {first_name, last_name, email, username, password, confirm_password}:{first_name: string, last_name:string, email:string, username:string, password:string, confirm_password:string} = req.body;

    // Check if the required fields are present in the request body
    const missing = checkRequiredFields(req, ["first_name", "last_name", "email", "username", "password", "confirm_password"]);

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

    // Check if the passwords entered by the user matches
    if(password !== confirm_password) {

        return res.status(400).json({
            message: "Passwords do not match"
        });

    }

    // Check if email address is already in use
    let user = await findUserByEmail(email);

    if(user !== null) {

        res.status(400).json({
            message: "Email already in use"
        });

    }

    // Check and see if the username is taken
    user = await findUserByUsername(username);

    if(user !== null) {

        return res.status(400).json({
            message: "Username taken"
        });

    }

    // Hash the user's password using bcrypt for safe db storage
    const salt = await bcrpyt.genSalt(10);
    const hash = await bcrpyt.hash(password, salt);

};

export default registerController;