import validator from "validator";

const checkEmailFormat = (email:string):boolean => {

    return validator.isEmail(email);

};

export default checkEmailFormat;