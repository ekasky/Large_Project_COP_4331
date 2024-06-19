import { UsernameConstraints } from "./interfaces";

const usernameConstraints:UsernameConstraints = {

    minLength: 1,
    maxLength: 30,
    pattern: /^[A-Za-z][A-Za-z0-9_]{0,29}$/

};

const checkUsernameFormat = (username:string):string | null => {

    // Trim leading and traling space
    username = username.trim();

    // Ensure the username meets the minimum length requirments
    if(username.length < usernameConstraints.minLength) {

        return `Username too short. Must be at least ${usernameConstraints.minLength} characters long`;

    }

    // Ensure the username does not exceed the max length
    if(username.length > usernameConstraints.maxLength) {

        return `Username too long. Must be ${usernameConstraints.maxLength} chatacters or less`;

    }

    // Check if the username matches the pattern
    if(!usernameConstraints.pattern.test(username)) {

        return 'Username must start with a letter and can only contain letters, numbers, and underscores';

    }
    
    return null;

};

export default checkUsernameFormat;