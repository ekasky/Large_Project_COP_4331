import { Request, Response } from "express";
import { ExpectedFields, ExpectedFieldsReturn } from "../utils/interfaces";
import checkRequiredFields from "../utils/checkRequiredFields";
import { requestLogger } from "../utils/logger";
import checkEmailFormat from "../utils/checkEmailFormat";
import checkUsernameFormat from "../utils/checkUsernameFormat";
import checkPasswordStrength from "../utils/checkPasswordStrength";
import bcrpyt from "bcrypt";
import { User } from "../model/User";
import sendEmailVerificationEmail from "../utils/sendEmailVerificationEmail";

const expectedFields:ExpectedFields[] = [
    {name: 'first_name', type: 'string'},
    {name: 'last_name', type: 'string'},
    {name: 'email', type: 'string'},
    {name: 'username', type: 'string'},
    {name: 'password', type: 'string'},
    {name: 'confirm_password', type: 'string'}
];

const registerController = async (req:Request, res:Response) => {

    // Check if all the required fields were sent in the request and make sure all the fields are the proper type
    const validationOfInputResult:ExpectedFieldsReturn | null = checkRequiredFields(req, expectedFields);

    if(validationOfInputResult !== null) {

        const { missingFields, incorrectTypes } = validationOfInputResult;

        if(missingFields.length > 0 && incorrectTypes.length > 0) {

            requestLogger(req, `Missing required fields and data types are incorrect -- MISSING FIELDS: ${missingFields.join(', ')} -- INCORRECT TYPES: ${incorrectTypes.map(type => type.field).join(', ')}`, 'ERROR');

            return res.status(422).json({
                message: "Missing required fields and data types are incorrect",
                missingFields: missingFields,
                incorrectTypes: incorrectTypes
            });

        }
        else if(missingFields.length > 0) {

            requestLogger(req, `Missing required fields and data types are incorrect -- MISSING FIELDS: ${missingFields.join(', ')}`, 'ERROR');

            return res.status(422).json({
                message: "Missing required fields",
                missingFields: missingFields,
            });

        }
        else if(incorrectTypes.length > 0) {

            requestLogger(req, `Missing required fields and data types are incorrect -- INCORRECT TYPES: ${incorrectTypes.map(type => type.field).join(', ')}`, 'ERROR');

            return res.status(422).json({
                message: "Missing required fields and data types are incorrect",
                incorrectTypes: incorrectTypes
            });

        }

    }

    // Validate that the email address is valid form
    const validEmailAddress = checkEmailFormat(req.body['email']);

    if(validEmailAddress !== null) {

        requestLogger(req, `${validEmailAddress}`, 'ERROR');

        return res.status(400).json({
            message: validEmailAddress
        });

    }

    // Validate the the username meets the requirments
    const validUsername = checkUsernameFormat(req.body['username']);

    if(validUsername !== null) {

        requestLogger(req, `${validUsername}`, 'ERROR');

        return res.status(400).json({
            message: validUsername
        });

    }

    // Validate the user's password strength
    const validPassword = checkPasswordStrength(req.body['password']);

    if(validPassword !== null) {

        requestLogger(req, `${validPassword}`, 'ERROR');

        return res.status(400).json({
            message: validPassword
        });

    }

    // Ensure that the confirm password and passwors match
    if(req.body['password'] !== req.body['confirm_password']) {

        requestLogger(req, 'Passwords do not match', 'ERROR');

        return res.status(400).json({
            message: 'Passwords do not match'
        });

    }

    // Extract all the request fields into variables
    const first_name:string = req.body['first_name'];
    const last_name:string = req.body['last_name'];
    const email:string = req.body['email'];
    const username:string = req.body['username'];
    const password:string = req.body['password'];
    const confirm_password:string = req.body['confirm_password'];

    // Check to see if the email is already in use
    try {

        const user = await User.findOne({email});

        if(user) {

            requestLogger(req, 'Email is already in use', 'ERROR');

            return res.status(400).json({
                message: 'Email is already in use'
            });

        }

    }
    catch(error:any) {

        requestLogger(req, `Error checking email in the database: ${error}`, 'ERROR');

        return res.status(500).json({
            message: `Error checking email in the database: ${error}`
        });

    }

    // Check to see if the username is already in use
    try {

        const user = await User.findOne({username});

        if(user) {

            requestLogger(req, `Username is taken`, 'ERROR');

            return res.status(400).json({
                message: 'Username is taken'
            });

        }

    }
    catch(error:any) {

        requestLogger(req, `Error checking username in the database: ${error}`, 'ERROR');

        return res.status(500).json({
            message: `Error checking email in the database: ${error}`
        });

    }

    // Hash the password for safe storage into database
    let hash:string;
    try {

        const salt = await bcrpyt.genSalt(10);
        hash = await bcrpyt.hash(password, salt);

    }
    catch(error:any) {

        requestLogger(req, `Error hasing the password: ${error}`, 'ERROR');

        return res.status(500).json({
            message: `Error hasing the password: ${error}`
        });

    }

    // Create a new user
    try {

        const user = new User({ first_name, last_name, email, username, password: hash });
        
        await user.save();

    }
    catch(error:any) {

        requestLogger(req, `An error occured while inserting a new user into the database: ${error}`, 'ERROR');

        return res.status(500).json({
            message: `An error occured while inserting a new user into the database: ${error}`
        });

    }

    // Send email verification
    sendEmailVerificationEmail(email);


    // Return success response
    return res.status(201).json({
        message: 'User Registered Successfully'
    });

    /* 
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

        // Validate that the email address is valid form
        // Ensures the email is in canonical form
        // Ensures the email is no longer than 100 characters long
        const validEmailAddress = checkEmailFormat(req.body['email']);

        // Handle a email validation error
        if(validEmailAddress !== null) {

            throw new InvalidInputFormatError(validEmailAddress);

        }

        // Validate the the username meets the requirments
        const validUsername = checkUsernameFormat(req.body['username']);

        // Handle a username validation error
        if(validUsername !== null) {

            throw new InvalidInputFormatError(validUsername);

        }

        // Validate the user's password strength
        const validPassword = checkPasswordStrength(req.body['password']);

        // Handle a password validation error
        if(validPassword !== null) {

            throw new InvalidInputFormatError(validPassword);

        }

        // Ensure both password and confirm password match
        if(req.body['password'] !== req.body['confirm_password']) {

            throw new InvalidInputFormatError('Passwords do not match');

        }

        // Ensure the email address is not already in use

        let hash:string;

        try {
            
            // Hash the user's password for safe storage
            const salt = await bcrpyt.genSalt(10);
            hash = await bcrpyt.hash(req.body['password'], salt);

        }
        catch(bcrpytError:any) {

            requestLogger(req, `Error hashing the password: ${bcrpytError.message}`, 'ERROR');

            return res.status(500).json({
                message: 'An error occurred while processing your register request. Please try again later.'
            });

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

        if(error instanceof InvalidInputFormatError) {

            requestLogger(req, `${error.message}`, 'ERROR');

            return res.status(400).json({

                message: error.message

            });

        }   

    }
    */

};

export default registerController;