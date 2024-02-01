const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('./public/pdfFiles/pdf_user_64ff0f9b15391cc89d32d512_1694437306446.pdf');

async function readPDF() {
    try {
        let result = await pdf(dataBuffer)
        console.log('result: ', result.text);
    } catch (error) {
        console.log('Error: ', error);
    }
}

readPDF();