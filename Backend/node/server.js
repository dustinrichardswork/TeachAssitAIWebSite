require('dotenv').config()
const cloudinary = require('cloudinary');

const app = require('./app');
const connectDatabase = require('./config/database');
// const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 4000;


// UncaughtException Error
process.on('uncaughtException', (err) => {
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

cloudinary.config({
    cloud_name: 'dorkg3ul4',
    api_key: '352236855563716',
    api_secret: 'RsdJiFa0fS8wRzp-EBwUoOR1m_A',
});

connectDatabase();

app.get('/', (req, res) => {
    res.render('index')
})

const server = app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
});


// Unhandled Promise Rejection
process.on('unhandledRejection', (err) => {
    console.log(`Error: ${err.message}`);
    server.close(() => {
        process.exit(1);
    });
});