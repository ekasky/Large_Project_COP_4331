import { Request, Response } from "express";

const registerController = (req:Request, res:Response) => {

    res.status(200).json({
        message: "Register Endpoint"
    });

};

export default registerController;