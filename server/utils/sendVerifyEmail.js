const nodemailer = require('nodemailer');

const sendVerifyEmail = async (jwt, email) => {

    // Get Gmail Credentials
    const emailAddress = process.env.EMAIL_ADDRESS;
    const emailPassword = process.env.EMAIL_PASSWORD;

    // Create HTML email message
    const htmlMessage = `
        <h1>Verify your email address</h1>
        <p>This link will be valid for 15 minutes</p>
        <button>Verify Account</button>
    `;

    // 
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: emailAddress,
            pass: emailPassword
        }
    });

    // 
    const info = await transporter.sendMail({
        from: `<${emailAddress}>`,
        to: `${email}`,
        subject: 'Verify your email address',
        html: htmlMessage
    });

    return info;

};

module.exports = sendVerifyEmail;