import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import checkRequiredFields from "../utils/checkRequiredFields";
import findUserByUsername from "../utils/findUserByUsername";

const loginController = async (req:Request, res:Response) => {

    // Extract the user's login credentials
    const { username, password } = req.body;

    // Check if the required fields are present in the request body
    const missing = checkRequiredFields(req, ["username", "password"]);

    if(missing !== null) {

        return res.status(400).json({
            message: "Missing required fields",
            missing: missing
        });

    }

    // Attempt to find the user by their username
    const user = await findUserByUsername(username);

    if(user === null) {

        return res.status(401).json({
            message: "Invalid Login Credentials"
        });

    }

    // Compare the password in the user document to the password supplied in the request
    const valid = await bcrypt.compare(password, user.password);

    if(!valid) {

        return res.status(401).json({
            message: "Invalid Login Credentials"
        });

    }

    // Get JWT key from env
    const JWT_KEY = process.env.JWT_PRIVATE_KEY as string;

    // Prepare JWT Data
    const iat = Math.floor(Date.now() / 1000); // Issued at in seconds
    const exp = iat + (2 * 60 * 60); // Expiration time in seconds (2 hours from now)
    const id  = user.id;

    // Create a jwt for the user's session
    const token = jsonwebtoken.sign({
        iat,
        exp,
        id,
        username
    }, JWT_KEY, {algorithm: 'HS256'} );

    // Return user token to the browser
    return res.status(200).json({
        token
    });

};

export default loginController;