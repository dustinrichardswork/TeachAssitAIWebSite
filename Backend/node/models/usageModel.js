const mongoose = require('mongoose')

const usageSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    plan: {
        type: String,
        default: 'Free'
    },
    usageCount: { type: Number, default: 0 },
    usageLimit: {
        type: Number,
        default: 5
    },
    storageUsed: { type: Number, default: 0 },
    storageLimit: {
        type: Number,
        default: 5
    },
    noOfFilesUploaded: { type: Number, default: 0 },
    noOfFilesUploadedLimit: { type: Number, default: 0 },
    payment: {
        type: Boolean,
        default: false
    },
    paymentDate: {
        type: Date
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    expiryDate: {
        type: Date,
        default: function() {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 7);
            return currentDate;
        }
    },
    lastUpdated: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Usage', usageSchema);