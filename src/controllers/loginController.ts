import { Request, Response } from "express";
import checkRequiredFields from "../utils/checkRequiredFields";

const loginController = (req:Request, res:Response) => {

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

};

export default loginController;