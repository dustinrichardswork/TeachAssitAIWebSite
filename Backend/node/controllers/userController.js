const User = require('../models/userModel');
const asyncErrorHandler = require('../middlewares/asyncErrorHandler');
const sendToken = require('../utils/sendToken');
const ErrorHandler = require('../utils/errorHandler');
const Usage = require('../models/usageModel');
const UserOTPVerification = require('../models/userOTPVerification');
const sendEmail = require('../utils/sendEmail');

const bcrypt = require('bcryptjs')
const crypto = require('crypto');
const api = require('../utils/api');
// const sendEmail = require('../utils/sendEmail');
// const cloudinary = require('cloudinary');

// Register User
exports.registerUser = asyncErrorHandler(async (req, res, next) => {

    let { firstName, lastName, email, password } = req.body
    firstName = firstName.trim();
    lastName = lastName.trim();
    email = email.trim();
    password = password.trim();

    let user = ''
    try {

        user = await User.create({
            firstName,
            lastName,
            email,
            password
        });


    } catch (error) {
        console.log('Error: ', error);
        res.status(409).json({
            error
        })
    }

    console.log('UserCreated: ', user);
    console.log('UserCreated(id): ', user.id);
    /*
    Send Confirmation Email to Customer for buyin Plan
*/
    let mailOptions = {
        from: 'info@teachassistai.com',
        to: user.email,
        subject: 'Purchased Plan Information',
        html: `
            <h1>Congratulations!</h1>
            <h4>You have subscribed to Free Plan</h4>
            <h6>You now have the following benefits</h6>
            <ul>
            <li>Access To All Chatbots</li>
            <li>Free 5 chat requests per day</li>
            <li>1 member</li>
            <li>Write in 30+ languages</li>
            <li>1 free file upload</li>
        </ul>
            <p>Thank You!</p>
            `
    };
    await sendEmail(mailOptions)
    let messageToAdmin = `
    <h1>New Subscriber</h1>
    <h4>Another User Subscribed to Free Plan</h4>
    <h6>User Info:</h6>
    <ul>
    <li><b>First Name:</b> ${user.firstName}</li>
    <li><b>Last Name:</b> ${user.lastName}</li>
    <li><b>Email:</b> ${user.email}</li>
</ul>
    `

    // formulating the message
    mailOptions.html = messageToAdmin;
    // changing email to admin email
    mailOptions.to = 'info@teachassistai.com'
    mailOptions.subject = 'New Free Plan Subscribed'
    await sendEmail(mailOptions)
    const usage = await Usage.create({
        user: user._id
    });

    sendOTPVerificationEmail(user, res)
    // sendToken(user, 201, res);
});

// Login User
exports.loginUser = asyncErrorHandler(async (req, res, next) => {
    let { email, password, verifiedDevice } = req.body;

    email = email.toLowerCase();

    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email And Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid Email or Password", 401));
    }

    sendToken(user, 201, res, verifiedDevice);
});


// Forgot Password
exports.forgotPassword = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHandler("User Not Found", 404));
    }

    const resetToken = await user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // const resetPasswordUrl = `${req.protocol}://${req.get("host")}/password/reset/${resetToken}`;
    const resetPasswordUrl = `https://${req.get("host")}/password/reset/${resetToken}`;
    // const resetPasswordUrl = `http://localhost:3000/password/reset/${resetToken}`;

    // const message = `Your password reset token is : \n\n ${resetPasswordUrl}`;

    try {
        let mailOptions = {
            from: 'info@teachassistai.com',
            to: user.email,
            subject: 'Reset Your Password',
            html: `
            <p>Here is your link for reseting Password <b>${resetPasswordUrl}</b></p>
            `
        };

        await sendEmail(mailOptions)

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`,
        });

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHandler(error.message, 500))
    }
});

// Reset Password
exports.resetPassword = asyncErrorHandler(async (req, res, next) => {

    console.log('Here is for Password Reset');

    // create hash token
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    });

    if (!user) {
        return next(new ErrorHandler("Invalid reset password token", 404));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();
    sendToken(user, 200, res);
});

// Update User Details
exports.enable2FA = asyncErrorHandler(async (req, res, next) => {

    try {
        const { enabled } = req.body;
        const filter = { _id: req.user.id };
        const update = { TwoFA: enabled };
        const option = { new: true };

        const updatedUser = await User.findByIdAndUpdate(filter, update, option);

        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            console.log('Two FA is Enabled');
            res.status(200).json({ success: true, user: updatedUser });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});

const sendOTPVerificationEmail = async (user, res) => {
    try {
        const otp = `${Math.floor(1000 + Math.random() * 9000)}`
        let mailOptions = {
            from: 'info@teachassistai.com',
            to: user.email,
            subject: 'Verify Your OTP',
            html: `
            <p>Enter <b>${otp}</b> in the app to verify your email and complete registeration.</p>
            <p>This code <b>expires in 1 hour</b></p>
            `
        };

        const isSuccess = await sendEmail(mailOptions)

        if (isSuccess) {
            const saltRounds = 10;
            const hashedOTP = await bcrypt.hash(otp, saltRounds);
            try {
                const newOTPVerification = new UserOTPVerification({
                    user: user._id,
                    otp: hashedOTP,
                    createdDate: Date.now(),
                    expiresDate: Date.now() + 3600000
                })

                await newOTPVerification.save();
                console.log('newOTP: ', newOTPVerification);
            } catch (error) {
                console.log('Error OTP: ', error);
            }
        }

        res.json({
            status: 'PENDING',
            message: 'Verification code sent',
            data: {
                userId: user._id,
                email: user.email
            }
        })
    } catch (error) {
        res.json({
            status: 'FAILED',
            error: error?.message,
        })
    }
}


exports.verifyOTP = asyncErrorHandler(async (req, res, next) => {

    try {
        let { userId, otp } = req.body;

        if (!userId || !otp) {
            throw Error('Empty otp details are not allowed')
        } else {
            console.log('UserId: ', userId);
            console.log('OTP: ', otp);

            const UserOTPVerificationRecord = await UserOTPVerification.find({ user: userId })
            console.log("UserOTPVerificationRecord: ", UserOTPVerificationRecord);
            console.log('Length: ', UserOTPVerificationRecord);
            if (!UserOTPVerificationRecord) {
                throw new Error("Account Record Doesn't exist or has been verified Already. Please signup or signin")
            } else {
                let { expiresDate } = UserOTPVerificationRecord[0];
                // expiresDate = new Date(expiresDate).getTime();

                const hashedOTP = UserOTPVerificationRecord[0].otp;

                expiresDate = new Date(expiresDate);
                const currentDate = new Date();
                const currentDateString = currentDate.toISOString();

                console.log('expire: ', expiresDate);
                console.log('Now: ', currentDateString);
                console.log('compare(<): ', expiresDate < currentDateString);

                if (expiresDate < currentDateString) {
                    await UserOTPVerification.deleteMany({ user: userId })
                    throw new Error('Code Has Expired. Please Request Again')
                } else {
                    console.log('Here it is: ');

                    const validOTP = bcrypt.compare(otp, hashedOTP)

                    if (!validOTP) {
                        throw new Error("Invalid OTP Passed. Please Check Your Email")
                    } else {
                        let user = await User.updateOne({ _id: userId }, { verified: true })
                        await UserOTPVerification.deleteMany({ user: userId })

                        user = await User.findOne({ _id: userId }).select("+password");
                        const token = user.getJWTToken();

                        const options = {
                            expires: new Date(
                                Date.now() + (parseInt(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000
                            ),
                            httpOnly: true
                        };
                        res.status(201)
                            .cookie('token', token, options)
                            .json({
                                status: "VERIFIED",
                                message: "User Email Verified",
                                verified: true,
                                user,
                                token
                            })
                    }
                }
            }
        }
    } catch (error) {
        console.log('Error: ', error);
        res.json({
            status: "FAILED",
            error: error?.message
        })
    }
});

exports.resendOTP = asyncErrorHandler(async (req, res, next) => {

    try {
        let { userId, email } = req.body;

        if (!userId || !email) {
            throw Error("Empty User details are not Allowed!")
        } else {
            await UserOTPVerification.deleteMany({ user: userId })
            sendOTPVerificationEmail({ _id: userId, email }, res)
        }
    } catch (error) {
        res.json({
            status: "FAILED",
            error: error.message
        })
    }
});

// Logout User
exports.logoutUser = asyncErrorHandler(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(200).json({
        success: true,
        message: "Logged Out",
    });
});

// Get User Details
exports.getUserDetails = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Details
exports.updateUserDetails = asyncErrorHandler(async (req, res, next) => {

    try {
        const body = req.body;
        const filter = { _id: req.user.id };
        const update = body;
        const option = { new: true };

        const updatedUser = await User.findByIdAndUpdate(filter, update, option);

        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            console.log('Updated the details of user');
            res.status(200).json({ success: true, user: updatedUser });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});

// Get All Users --ADMIN
exports.getAllUsers = asyncErrorHandler(async (req, res, next) => {

    let data = await Usage.find();

    for (let i = 0; i < data.length; i++) {

        try {
            const usage = await Usage.findOne({ user: data[i]._id });

            if (usage) {
                const now = new Date();
                const lastUpdated = usage.lastUpdated;

                if (now - lastUpdated > 24 * 60 * 60 * 1000) {
                    console.log("Limit is reseted");
                    usage.usageCount = 1;
                    usage.lastUpdated = now;
                    await usage.save();
                }

            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    data = await Usage.find().populate('user');

    res.status(200).json({
        success: true,
        users: data,
    });
});

// Update User Details
exports.changePassword = asyncErrorHandler(async (req, res, next) => {

    try {
        const body = req.body;
        const { currentPassword, newPassword, confirmNewPassword } = body;



        const user = await User.findOne({ _id: req.user.id }).select('+password');

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }

        const isValid = await user.comparePassword(currentPassword)

        if (!isValid) {
            return res.status(404).json({
                message: "Current Password Is Wrong"
            })
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(500).json({
                message: "Password Must Match"
            })
        }

        user.password = newPassword;

        const updatedUser = await user.save();

        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            console.log('Updated the details of user');
            res.status(200).json({ success: true, user: updatedUser, message: "Password Updated" });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});


// Update User Details
exports.changeEmail = asyncErrorHandler(async (req, res, next) => {

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ _id: req.user.id })

        if (!user) {
            return res.status(404).json({
                message: "User Not Found"
            })
        }
        else if (!user.comparePassword(password)) {
            return res.status(404).json({
                message: "Enter Valid Password"
            })
        }

        user.email = email
        const updatedUser = await user.save();
        if (!updatedUser) {
            res.status(404).json({ success: false, message: 'User not found' });
        } else {
            console.log('Email Changed');
            res.status(200).json({ success: true, user: updatedUser });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }

});


exports.deleteAccount = asyncErrorHandler(async (req, res, next) => {

    const user = await User.findOne({ _id: req.user.id })
    const usage = await Usage.findOne({ user: user._id })

    try {
        await User.deleteOne({ _id: user._id });
        await Usage.deleteOne({ _id: usage._id });

        return res.status(200).json({
            message: "Account Deleted"
        })
    } catch (error) {
        console.log('error while deleting');
        res.status(500).json({
            message: "Error While Deleting Account"
        })
    }
});


exports.userDeletedByAdmin = asyncErrorHandler(async (req, res, next) => {

    const { userId } = req.params
    try {

        const user = await User.findOne({ _id: userId })
        const usage = await Usage.findOne({ user: user._id })

        await User.deleteOne({ _id: user._id });
        await Usage.deleteOne({ _id: usage._id });

        return res.status(200).json({
            message: "Account Deleted"
        })
    } catch (error) {
        console.log('error while deleting: ', error);
        res.status(500).json({
            message: "Error While Deleting Account"
        })
    }
});

exports.getUsage = asyncErrorHandler(async (req, res, next) => {

    let data = await Usage.findOne({ user: req.user.id });

    res.status(200).json({
        success: true,
        usage: data,
    });
});


exports.cancelPlan = asyncErrorHandler(async (req, res, next) => {

    const { userId, usageId } = req.body;

    // if (!userId || !usageId) {
    //     return res.status(404).json({
    //         message: "Insufficient Info"
    //     })
    // }

    try {
        // const user = await User.findOne({ _id: userId })
        // const usage = await Usage.findOne({ _id: usageId })

        let filter = {
            _id: usageId
        }

        let update = {
            $set: {
                plan: 'Free',
                usageCount: 0,
                usageLimit: 5,
                noOfFilesUploaded: 0,
                noOfFilesUploadedLimit: 0,
                payment: false,
                startDate: Date.now(),
                expiryDate: Date.now(),
            }
        }
        let options = {
            new: true
        }

        const updatedUsage = await Usage.findByIdAndUpdate(filter, update, options);
        if (updatedUsage) {
            console.log('Updated Document: ', updatedUsage);
            return res.status(200).json({
                message: "Updated the Usage. Canceled the Plan"
            })
        } else {
            return res.status(500).json({
                message: "Error While updating the mongodb"
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Error While updating usage (cancel plan)Catch"
        })
    }
});

exports.googleTranslator =  asyncErrorHandler(async (req, res, next) => {
    const { body, chat_id } = req.body;
    console.log(body)
    api.post('/translate', body)
        .then(rlt => {
            res.json({ text: rlt.data.text })
        }).catch(err => {
            console.log('Translation Error!');
        })
})