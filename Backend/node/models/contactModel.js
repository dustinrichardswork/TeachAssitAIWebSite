const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true, "Please enter Email"]
    },
    message: {
        type: String,
        required: [true, "Please Enter Message"]
    }
});

module.exports = mongoose.model('Contact', contactSchema);