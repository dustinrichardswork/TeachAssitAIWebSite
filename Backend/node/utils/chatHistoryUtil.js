const Chatbot = require('../models/chatbotModel');
const ChatHistory = require('../models/chatHistoryModel');
const api = require('./api');

const Usage = require('../models/usageModel');
const UploadInfo = require('../models/uploadFileModel');

const fs = require('fs');
const path = require('path')
const pdf = require('pdf-parse');
const fsPromises = require("fs").promises;

const mammoth = require('mammoth');
// const { getClients, chatStream, name } = require('../controllers/chatController');
// console.log("Working Directory: ",require('../controllers/chatController'));
// console.log(name)

exports.createChatHistoryAndGiveData = async (req, chatbot_name) => {

    console.log('req.body: ', req.body);

    let { chat_id, body } = req.body
    const user_id = req.user.id

    // Creating the Chat History if already is not created
    if (!chat_id) {
        let chatbot = await Chatbot.findOne({ name: chatbot_name });
        if(chatbot === null){
            chatbot = await Chatbot.create({ name: chatbot_name })
        }
        console.log('chatbot: ', chatbot._id);
        const chat_history = await ChatHistory.create({
            user: user_id,
            chatbot: chatbot._id,
            content: []
        })
        console.log('ChatHistory(Created): ', chat_history);
        chat_id = chat_history._id
    } else {
        console.log('ChatHisotry Not Created: chat_id: ', chat_id);
    }

    let data = {
        prompt: body,
        user_id: user_id,
        conversation_id: chat_id
    }

    return {
        chat_id,
        body,
        data
    }
}

const updateChatHistory = async (chat_id, answer, res, title) => {
    try {


        const filter = { _id: chat_id }
        const update = { $push: { content: answer }, $set: { title: title } };
        const options = { new: true };

        const updatedDocument = await ChatHistory.findOneAndUpdate(filter, update, options);

        if (updatedDocument) {
            console.log('\n\n\nUpdated document:', updatedDocument);
        } else {
            console.log('\n\nDocument not found.');
        }

        let endData = {
            // answer: answer.answer,
            chat_id
        }

        res.write(JSON.stringify(endData));
        res.end();
        // res.json({
        //     answer: answer.answer,
        //     chat_id
        // })
    }
    catch (error) {
        res.status(500).json({
            message: "Error While Updating the history. (catch)",
            error: error
        })
        console.log('\n\n\nError: \n', error);
    }
}

exports.fetchDataFromFlaskAPI = async (res, url, data, result, body) => {
    try {
        const chat_id = data.conversation_id;
        console.log('Inner: chatId: ', chat_id);

        const response = await api.post(url, data, {
            responseType: 'stream'
        });

        if (response.statusText === 'OK') {
            let question = body.prompt || null;

            const chatHistory = await ChatHistory.findOne({ _id: chat_id });

            let title = chatHistory.title;

            if (!title) {
                console.log('Fetching the title');
                const titleData = { user_id: data.user_id, conversation_id: chat_id };
                const titles = await api.post('/chattitles', titleData);
                title = titles.data.title;
            } else {
                console.log('Title Already Exist');
            }

            console.log('title: ', title);

            const responseDataChunks = [];

            response.data.on('data', (chunk) => {
                console.log('chunk: ', chunk.toString());
                responseDataChunks.push(chunk);
                res.write(chunk);
                // res.write(`Data chunk\n`);
            });

            response.data.on('end', async () => {
                const responseBodyBuffer = Buffer.concat(responseDataChunks);
                const responseBody = responseBodyBuffer.toString('utf8');

                console.log('response: ', responseBody);

                const answer = responseBody;
                console.log('q: ', question);
                console.log('ans: ', answer);

                updateChatHistory(chat_id, { question, answer }, res, title);
            });
        } else {
            res.status(500).json({
                message: `Error from else, after calling to ${url}`,
            });
        }
    } catch (error) {
        console.error(`Error From Flask: ${url}: `, error);
        res.status(500).json({
            message: `Error From ${url}`,
        });
    }
};


exports.uploadInfoUpdateUsageReadPDF = async (req, data) => {
    // Get File Info Start
    let fileSize = 0;
    // Check if the file exists and get its stats
    let filePath = path.join(__dirname, '..', 'public', 'pdfFiles', req.savedPdfFile);
    console.log('file Full Path: ', filePath);

    try {
        await fsPromises.access(filePath);
        const stats = await fsPromises.stat(filePath);
        console.log(`File '${filePath}' exists.`);
        // console.log('stats: ', stats);
        fileSize = (stats.size / (1024 * 1024)).toFixed(3)
        console.log(`File size: ${fileSize} MB`);
    } catch (error) {
        console.log('erro: ', error);
    }

    try {
        const uploadInfo = new UploadInfo({
            user_id: req.user.id,
            chat_id: data.conversation_id,
            file_name: req.savedPdfFile,
            file_size: fileSize,
        });
        if (uploadInfo) {
            console.log('File Info Stored: ', uploadInfo);
        } else {
            console.log('Error while storing the file');
        }
    } catch (error) {

        console.log('Error while storing the file');
        console.log('Error: ', error);

    }

    // Get File Info End
    let usage = await Usage.findOne({ user: req.user.id })
    console.log('Usage: ', usage);


    if (usage) {

        try {
            const updatedUsage = await Usage.findByIdAndUpdate(usage.id, {
                noOfFilesUploaded: usage.noOfFilesUploaded + 1,
                storageUsed: usage.storageUsed + fileSize
            });

            if (updatedUsage) {
                console.log('Usage plan updated:', updatedUsage);
            } else {
                console.log('Usage not found or no updates were made.');
            }
        } catch (err) {
            console.error('Error updating user plan:', err);
        }
    }

    let pdfText = ''
    try {
        if (req.savedPdfFile.endsWith('.pdf')) {
            // Handle PDF file
            let dataBuffer = fs.readFileSync(filePath);
            const result = await pdf(dataBuffer);
            pdfText = result.text;
            console.log(pdfText ? 'Text is here' : 'Text didn\'t read');
        }
        else if (req.savedPdfFile.endsWith('.doc') || req.savedPdfFile.endsWith('.docx')) {
            // Handle DOC file
            const result = await mammoth.extractRawText({ path: filePath });
            pdfText = result.value;
            console.log(pdfText ? 'Text is here' : 'Text didn\'t read');
        } else {
            console.log('Unsupported file format');
        }

    } catch (error) {
        console.log('Error: ', error);
    }

    return pdfText
}

exports.updateChatHistory = updateChatHistory