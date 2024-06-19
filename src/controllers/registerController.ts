import { Request, Response } from "express";
import checkRequiredFields, { ExpectedFields, ExpectedFieldsReturn } from "../utils/checkRequiredFields";
import { IncorrectTypesError, MissingFieldsAndIncorrectTypesError, MissingFieldsError } from "../utils/errorTypes";
import requestLogger from "../utils/requestLogger";

const expectedFields:ExpectedFields[] = [
    {name: 'first_name', type: 'string'},
    {name: 'last_name', type: 'string'},
    {name: 'email', type: 'string'},
    {name: 'username', type: 'string'},
    {name: 'password', type: 'string'},
    {name: 'confirm_password', type: 'string'}
];

const registerController = async (req:Request, res:Response) => {

    try {

        // Check if all the required fields were sent in the request and make sure all the fields are the proper type
        const validationOfInputResult:ExpectedFieldsReturn | null = checkRequiredFields(req, expectedFields);
        
        // Handle the missing field or incorrect type error
        if(validationOfInputResult !== null) {

            const { missingFields, incorrectTypes } = validationOfInputResult;

            if(missingFields.length > 0 && incorrectTypes.length > 0) {

                throw new MissingFieldsAndIncorrectTypesError('Missing required fields and data types are incorrect', validationOfInputResult);

            }
            else if(missingFields.length > 0) {

                throw new MissingFieldsError('Missing required fields', missingFields);

            }
            else if(incorrectTypes.length > 0) {

                throw new IncorrectTypesError('Incorrect data types in fields', incorrectTypes);

            }
            

        }

        return res.send("GOOD");

    }
    catch(error:any) {


        if(error instanceof MissingFieldsAndIncorrectTypesError) {

            requestLogger(req, `${error.message} -- MISSING FIELDS: ${error.expectedFields.missingFields.join(', ')} -- INCORRECT TYPES: ${error.expectedFields.incorrectTypes.map(type => type.field).join(', ')}`, 'ERROR');

            return res.status(422).json({
                message: error.message,
                missingFields: error.expectedFields.missingFields,
                incorrectTypes: error.expectedFields.incorrectTypes
            });

        }

        if(error instanceof IncorrectTypesError) {

            requestLogger(req, `${error.message} -- INCORRECT TYPES: ${error.incorrectTypes.map(type => type.field).join(', ')}`, 'ERROR');

            return res.status(422).json({
                message: error.message,
                incorrectTypes: error.incorrectTypes
            });

        }

        if(error instanceof MissingFieldsError) {

            requestLogger(req, `${error.message} -- MISSING FIELDS: ${error.missingFields.join(', ')}`, 'ERROR');

            return res.status(400).json({
                message: error.message,
                missingFields: error.missingFields
            });

        }

        

    }

    /* 
    // Extract the request body from the request
    const {first_name, last_name, email, username, password, confirm_password}:{first_name: string, last_name:string, email:string, username:string, password:string, confirm_password:string} = req.body;

    // Check if the required fields are present in the request body
    const missing = checkRequiredFields(req, ["first_name", "last_name", "email", "username", "password", "confirm_password"]);

    if(missing !== null) {

        logger(req, res, `[Error]Missing requred fields: ${missing?.join(', ')}`);

        return res.status(400).json({
            message: "Missing required fields",
            missing: missing
        });

    }

    // Check if email is valid format
    if(!checkEmailFormat(email)) {

        logger(req, res, "[Error]Invalid email address format");

        return res.status(400).json({
            message: "Invalid email address format"
        });

    }

    // Check the strength of the password
    if(!checkPasswordStrength(password)) {

        logger(req, res, "[Error]Password weak. Must be at least 8 character's long, Have at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol");

        return res.status(400).json({
            message: "Password weak. Must be at least 8 character's long, Have at least 1 lowercase, 1 uppercase, 1 number, and 1 symbol",
        });

    }

    // Check if the passwords entered by the user matches
    if(password !== confirm_password) {

        logger(req, res, "[Error]Passwords do not match");

        return res.status(400).json({
            message: "Passwords do not match"
        });

    }

    let user;

    try {

        // Check if email address is already in use
        user = await findUserByEmail(email);

        if(user !== null) {

            logger(req, res, "[Error] Email already in use");
    
            return res.status(400).json({
                message: "Email already in use"
            });
    
        }

    }
    catch(error){

        const err = error as Error;

        logger(req, res, `[Error] Could not check email availability: ${error}`);

        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });

    }

    try {
        
        // Check and see if the username is taken
        user = await findUserByUsername(username);

        if(user !== null) {

            return res.status(400).json({
                message: "Username taken"
            });
    
        }

    }
    catch(error) {

        const err = error as Error;

        logger(req, res, `[Error] Could not check username availability: ${error}`);

        return res.status(500).json({
            message: "Internal server error",
            error: err.message
        });

    }

    try {

        // Hash the user's password using bcrypt for safe db storage
        const salt = await bcrpyt.genSalt(10);
        const hash = await bcrpyt.hash(password, salt);

    }
    catch(error) {

        const err = error as Error;

        logger(req, res, `[Error] Could not hash password: ${err.message}`);

        return res.status(500).json({
            message: 'Internal server error',
            error: err.message
        });

    }
    

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
    */
    

};

export default registerController;