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

    // Get user, pass, and base domain
    const auth_email_address = process.env.EMAIL_ADDRESS;
    const auth_password = process.env.EMAIL_PASSWORD;
    const base_url = process.env.BASE_URL;

    // Create the verification link
    const link = `${base_url}/verify-account?token=${token}`;


    // Configure nodemailer
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: auth_email_address,
            pass: auth_password
        }
    });

};

export default sendEmailVerificationEmail;