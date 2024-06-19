import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jsonwebtoken from "jsonwebtoken";
import checkRequiredFields from "../utils/checkRequiredFields";
import findUserByUsername from "../utils/findUserByUsername";
import { User } from "../model/User";

const loginController = async (req:Request, res:Response) => {

    /* 
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

    // Ensure the user is not locked
    if(user.accountLocked) {

        return res.status(401).json({
            message: "User account locked. Please reset your password"
        });

    }

    // Compare the password in the user document to the password supplied in the request
    const valid = await bcrypt.compare(password, user.password);

    if(!valid) {

        // Add 1 to the login attempts
        await User.findByIdAndUpdate(user.id, { $inc: { loginAttempts: 1 } });

        // Lock the account if the user tries more than 5 times unsuccessfully
        if(user.loginAttempts+1 >= 5) {

            await User.findByIdAndUpdate(user.id, {
                loginAttempts: 0,
                accountLocked: true
            });

        }

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

    // Reset login attempts on successful login
    await User.findByIdAndUpdate(user._id, {
        loginAttempts: 0,
        accountLocked: false
    });

    // Return user token to the browser
    return res.status(200).json({
        token
    });
    */

};

export default loginController;