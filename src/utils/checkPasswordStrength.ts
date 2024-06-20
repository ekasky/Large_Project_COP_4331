import validator from "validator";
import { PasswordRequirements } from "./interfaces";

const passwordRequirements:PasswordRequirements = {
    minLength: 8,
    maxLength: 64,
    minLowerCase: 1,
    minUpperCase: 1,
    minNumbers: 1,
    minSymbols: 1
};

const checkPasswordStrength = (password:string):string | null => {

    
    // Trim leading and trailing spaces
    password = password.trim();

    // Check if password meets the min length requirment
    if(password.length < passwordRequirements.minLength || password.length > passwordRequirements.maxLength || !validator.isStrongPassword(password, passwordRequirements)) {

        return `Password must be at least ${passwordRequirements.minLength} characters long, not exceed ${passwordRequirements.maxLength} characters, contain at least ${passwordRequirements.minLowerCase} lowercase letter${passwordRequirements.minLowerCase > 1 ? 's' : ''}, ${passwordRequirements.minUpperCase} uppercase letter${passwordRequirements.minUpperCase > 1 ? 's' : ''}, ${passwordRequirements.minNumbers} number${passwordRequirements.minNumbers > 1 ? 's' : ''}, and ${passwordRequirements.minSymbols} symbol${passwordRequirements.minSymbols > 1 ? 's' : ''}.`;

    }

    return null;

};

export default checkPasswordStrength;