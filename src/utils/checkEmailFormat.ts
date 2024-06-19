import validator from "validator";

const MAX_EMAIL_LENGTH = 100;

const checkEmailFormat = (email:string):string | null => {

    // Trim leading and trailing spaces
    email = email.trim();

    // Sanitize the email input
    email = validator.normalizeEmail(email) || '';

    if( !email || !validator.isEmail(email) ) {

        return 'Invalid email address';

    }

    if(email.length > MAX_EMAIL_LENGTH) {

        return "Email address too long";

    }

    return null;
};

export default checkEmailFormat;