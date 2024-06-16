import { Request, Response } from "express";

const registerController = async (req:Request, res:Response) => {

    // Extract the request body from the request
    const {first_name, last_name, email, username, password}:{first_name: string, last_name:string, email:string, username:string, password:string} = req.body;
    

};

export default registerController;