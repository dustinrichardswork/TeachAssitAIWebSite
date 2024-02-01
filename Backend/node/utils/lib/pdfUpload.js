const multer = require("multer");
const path = require("path");
const ErrorHandler = require("../errorHandler");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const rootDir = path.dirname(require.main.filename);
        cb(null, path.join(rootDir, "/public/pdfFiles"));
    },

    filename: function (req, file, cb) {
        const extension = path.extname(file.originalname).toLowerCase();
        const allowedExtensions = [".pdf", ".doc", ".docx"]; // You can add more allowed extensions if needed
        if (!allowedExtensions.includes(extension)) {
            return cb(new ErrorHandler("Please provide a valid PDF or DOC file", 400), false);
        }
        
        req.savedPdfFile = "user_" + req.user.id + "_" + Date.now() + extension;

        cb(null, req.savedPdfFile);
    },
});

const fileFilter = (req, file, cb) => {
    // Define allowed MIME types for PDF and DOC files
    const allowedMimeTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
    
    if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new ErrorHandler("Please provide a valid PDF or DOC file", 400), false);
    }
    
    cb(null, true);
};

const fileUpload = multer({ storage, fileFilter });

module.exports = fileUpload;
