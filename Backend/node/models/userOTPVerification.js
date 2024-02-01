const { default: mongoose } = require("mongoose");

const userOTPVerification = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        require: true
    },
    otp: String,
    createdDate: {
        type: Date,
        default: Date.now
    },
    expiresDate: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("UserOTPVerification", userOTPVerification);