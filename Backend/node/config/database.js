const mongoose = require('mongoose');
// const MONGO_URI = 'mongodb://localhost:27017/teachai';
const MONGO_URI = 'mongodb://127.0.0.1:27017/teachai';
// const MONGO_URI = 'mongodb+srv://khalil:raeela123@cluster0.zd8175o.mongodb.net/teachai?retryWrites=true&w=majority';

const connectDatabase = () => {
    mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log("Mongoose Connected");
        })
        .catch((error) => {
            console.error("Mongoose Connection Error:", error);
        });
};

module.exports = connectDatabase;