const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
// const sendEmail = require('../utils/sendEmail');

const Contact = require('../models/contactModel');
const sendEmail = require('../utils/sendEmail');

// Create New Order
exports.createContact = asyncErrorHandler(async (req, res, next) => {


    const { firstName, lastName, email, message } = req.body;

    // const transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 465,
    //     secure: true, // use SSL
    //     auth: {
    //         user: 'info@teachassistai.com',
    //         pass: 'Robertosydney10#'
    //     }
    // });

    // let transporter = nodemailer.createTransport({
    //     service: 'Gmail',
    //     auth: {
    //         user: 'info@teachassistai.com',
    //         pass: 'Robertosydney10#'
    //     }
    // });

    let mailOptions = {
        from: 'info@teachassistai.com',
        to: 'info@teachassistai.com',
        subject: 'New Contact Form Submission',
        text: `First Name: ${firstName}\nLast Name: ${lastName}\nEmail: ${email}\nMessage: ${message}`
    };

    await sendEmail(mailOptions)

    try {

        const contact = new Contact({
            firstName,
            lastName,
            email,
            message
        });

        await contact.save();

        res.status(201).json({
            message: "Contact Has been Saved And Email is Send Successfully!"
        });
    } catch (error) {
        console.log('Error: ', error);
        res.status(500).json({
            message: "Contact Form Failed to Submit!"
        });
    }
});


exports.enterPriseEmail = asyncErrorHandler(async (req, res, next) => {

    const { schoolName, personName, email, numberOfTeachers, gradeLevelCovered, preferedPlanDuration, additionalFeaturesRequired } = req.body;

    let mailOptions = {
        from: 'info@teachassistai.com',
        to: 'info@teachassistai.com',
        subject: 'Contact For Enterprise Plan',
        html: `
        <p><b>School Name:</b> ${schoolName || ''}</p>
        <p><b>Person Name:</b> ${personName || ''}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Number of Teachers:</b> ${numberOfTeachers || ''}</p>
        <p><b>Grade Level Covered:</b> ${gradeLevelCovered || ''}</p>
        <p><b>Preffered Plan Duration:</b> ${preferedPlanDuration || ''}</p>
        <p><b>Additional Feature Required:</b> ${additionalFeaturesRequired || ''}</p>
        `
    };

    const rs = await sendEmail(mailOptions)

    if (rs) {
        res.status(201).json({
            message: "Contact Has been Saved And Email is Send Successfully!"
        });
    } else {
        console.log('Error: ', error);
        res.status(500).json({
            message: "Contact Form Failed to Submit!"
        });
    }
});