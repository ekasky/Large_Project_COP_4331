const validator = require('validator');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const registerController = async (req, res) => {

    // Extract the request fields
    const { first_name, last_name, email, password, username } = req.body;

    // Check for missing fields
    const requiredFields = ['first_name', 'last_name', 'email', 'password', 'username'];
    const missingFields  = requiredFields.filter(field => !req.body[field]);                            // Iterates over the required field array and checks if the current field evalutes to falsy. If falsy then the field is missing and is appended to the new array

    if(missingFields.length !== 0) {

        return res.status(400).json({

            error: `Missing required fields: ${missingFields.join(', ')}`

        });

    }

    // Check the email format
    if(!validator.isEmail(email)) {

        return res.status(400).json({

            error: 'Invalid email format'

        });

    }

    // Password requirements
    const passwordRequirements = {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1

    };

    // Check the password strength using validator
    if(!validator.isStrongPassword(password, passwordRequirements)) {

        return res.status(400).json({

            error: 'Password requirements not met. It should be at least 8 characters long and contain at least 1 lowercase letter, 1 uppercase letter, 1 symbol, and 1 digit.'

        });

    }

    try {

        // Check to see if the user email is in use
        if(await User.findOne({email})) {

            return res.status(409).json({
                error: 'Email already in use'
            });

        }

        // Check to see if the username is in use
        if(await User.findOne({username})) {

            return res.status(409).json({
                error: 'Username taken'
            });

        }

        

    }
    catch(error) {

        console.error('Error registering user: ', error);

        res.status(500).json({
            error: 'Failed to register user. Please try again later.'
        });

    }    

};

module.exports = {
    registerController,
};