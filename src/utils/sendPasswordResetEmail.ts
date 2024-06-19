import jsonwebtoken from "jsonwebtoken";
import nodemailer from "nodemailer";

const sendPasswordResetEmail = async (email:string):Promise<void> => {

    const JWT_KEY = process.env.JWT_PRIVATE_KEY as string;

    // Prepare JWT Data
    const iat = Math.floor(Date.now() / 1000); // Issued at in seconds
    const exp = iat + (15 * 60); // Expiration time in seconds (15 minutes from now)

    // Create jwt
    const token = jsonwebtoken.sign({
        email,
        iat,
        exp,
        purpose: 'Account verification'
    }, JWT_KEY, {algorithm: 'HS256'});

    // Get user, pass, and base domain
    const auth_email_address = process.env.EMAIL_ADDRESS;
    const auth_password = process.env.EMAIL_PASSWORD;
    const base_url = process.env.BASE_URL;

    // Create the reset password link
    const link = `${base_url}/reset-password?token=${token}`;

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

    // Create HTML email message
    const html = `
        <h1>Reset Your Password</h1>
        <p>Click the <a href="${link}">link</a> to reset your password</p>
        <p>If you did not request this, please secure your account.</p>
    `;

    // Send the email
    await transporter.sendMail({

        from: `${auth_email_address}`,
        to: `${email}`,
        subject: `Verify your account`,
        html: html

    });

};

export default sendPasswordResetEmail;