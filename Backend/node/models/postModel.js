const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please enter Post Title"],
        trim: true
    },
    shortDescription: {
        type: String,
        required: [true, "Please enter Short description"]
    },
    longDescription: {
        type: String,
        required: [true, "Please enter Long description"]
    },

    image:
    {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Post', postSchema);