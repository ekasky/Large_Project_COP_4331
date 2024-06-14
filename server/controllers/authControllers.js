const validator = require('validator');

const registerController = (req, res) => {

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

};

module.exports = {
    registerController,
};