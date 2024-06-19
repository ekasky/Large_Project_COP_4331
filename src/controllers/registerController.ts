import { Request, Response } from "express";
import bcrpyt from "bcrypt";
import checkRequiredFields from "../utils/checkRequiredFields";
import checkEmailFormat from "../utils/checkEmailFormat";
import checkPasswordStrength from "../utils/checkPasswordStrength";
import findUserByEmail from "../utils/findUserByEmail";
import findUserByUsername from "../utils/findUserByUsername";
import { User, UserDocument } from "../model/User";
import sendEmailVerificationEmail from "../utils/sendEmailVerificationEmail";
import logger from "../utils/logger";

const registerController = async (req:Request, res:Response) => {

    // Extract the request body from the request
    const {first_name, last_name, email, username, password, confirm_password}:{first_name: string, last_name:string, email:string, username:string, password:string, confirm_password:string} = req.body;

    // Check if the required fields are present in the request body
    const missing = checkRequiredFields(req, ["first_name", "last_name", "email", "username", "password", "confirm_password"]);

    if(missing !== null) {

        logger(req, res, `Missing requred fields: ${missing?.join(', ')}`);

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

        return res.status(400).json({
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

    // Create a new user object to insert to the db
    const newUser = new User({
        first_name,
        last_name,
        email,
        username,
        password: hash,
        emailVerified: false
    });

    // Save the new user to the db
    await newUser.save();

    // Send email verification code
    await sendEmailVerificationEmail(email);

    // Respond with a success message
    res.status(200).json({
        message: "User registered successfully"
    });
    

};

export default registerController;