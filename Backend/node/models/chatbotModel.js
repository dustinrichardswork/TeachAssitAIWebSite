const { default: mongoose } = require("mongoose");

const chatbotSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Chatbot", chatbotSchema);