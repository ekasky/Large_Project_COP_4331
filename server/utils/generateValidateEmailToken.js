const jwt = require('jsonwebtoken');

const generateValidateEmailToken = (email) => {

    const key = process.env.JWT_PRIVATE_KEY;

    // Prepare data to encode
    const issuedAt = Date.now();
    const expiresIn = 15 * 60;

    // Create token
    const token = jwt.sign({
        email: email,
        iat: issuedAt,
        exp: issuedAt + expiresIn,
        purpose: 'Email Verification'
    }, 
    key,
    {
        algorithm: 'RS256'
    });

    return token;

};

module.exports = generateValidateEmailToken;