import validator from "validator";
import { PasswordRequirements } from "./interfaces";

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