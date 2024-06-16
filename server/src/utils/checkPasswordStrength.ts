import validator from "validator";

export interface PasswordRequirements {
    minLength: number,
    minLowerCase: number,
    minUpperCase: number,
    minNumbers: number,
    minSymbols: number
};

const checkPasswordStrength = (password:string):boolean => {

    // Define password requirements
    const passwordRequirements:PasswordRequirements = {
        minLength: 8,
        minLowerCase: 1,
        minUpperCase: 1,
        minNumbers: 1,
        minSymbols: 1
    };

    return validator.isStrongPassword(password, passwordRequirements);

};

export default checkPasswordStrength;