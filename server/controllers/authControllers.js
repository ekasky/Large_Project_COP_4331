

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

};

module.exports = {
    registerController,
};