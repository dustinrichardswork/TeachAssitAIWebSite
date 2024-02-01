const nodemailer = require('nodemailer');
// const sgMail = require('@sendgrid/mail')
// sgMail.setApiKey('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');

const sendEmail = async (options) => {


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
            user: 'info@teachassistai.com',
            pass: 'lzirrqyedfdfxwkw'
        }
    });

    try {
        await transporter.sendMail(options);
        return true;
    } catch (error) {
        console.log('Error While sending Email: ', error);
        return false;
    }
};

module.exports = sendEmail;