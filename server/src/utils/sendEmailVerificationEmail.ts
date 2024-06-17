import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";

const sendEmailVerificationEmail = (email:string) => {

    const JWT_KEY = process.env.JWT_PRIVATE_KEY as string;

    // Prepare JWT Data
    const iat = Date.now();
    const exp = 15 * 60;

    // Create jwt
    const token = jsonwebtoken.sign({
        email,
        iat,
        exp: iat + exp,
        purpose: 'Account verification'
    }, JWT_KEY, {algorithm: 'HS256'});

};

export default sendEmailVerificationEmail;