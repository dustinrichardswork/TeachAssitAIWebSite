const { default: mongoose } = require("mongoose");
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const Chatbot = require('../models/chatbotModel');
const ChatHistory = require('../models/chatHistoryModel')

// exports.createChatHistory = asyncErrorHandler(
//     async (req, res, next) => {

//         const { chatbot_name, answer } = req.body
//         const user_id = req.user._id

//         try {
//             const temp = await Chatbot.findOne({ name: chatbot_name });
//             // console.log('Here is chatbot: \n', temp);

//             const data = await ChatHistory.create({
//                 user: user_id,
//                 chatbot: temp._id,
//                 content: [{ answer }]
//             })

//             console.log('Created: \n', data);

//             res.status(200).json({
//                 success: true,
//                 message: `History created for chatbot: ${chatbot_name} `,
//                 data
//             })
//         } catch (error) {
//             console.log('Error: \n', error);
//             res.status(500).json({
//                 success: false,
//                 message: "Error While fetching History for Chatbot"
//             })
//         }
//     }
// )

// exports.updateChatHistory = asyncErrorHandler(
//     async (req, res, next) => {

//         const { chat_id, answer } = req.body

//         try {

//             // console.log('Here is chatbot: \n', temp);

//             const update = { $push: { answers: newItem } };
//             const options = { new: true };

//             const updatedDocument = await ChatHistory.findOneAndUpdate(chat_id, update, options);

//             if (updatedDocument) {

//                 console.log('Updated document:', updatedDocument);
//                 res.status(200).json({
//                     success: true,
//                     message: `History Updated `,
//                     data: updatedDocument
//                 })

//             } else {

//                 console.log('Document not found.');
//                 res.status(404).json({
//                     success: true,
//                     message: 'Document not found.'
//                 })
//             }


//         } catch (error) {
//             console.log('Error: \n', error);
//             res.status(500).json({
//                 success: false,
//                 message: "Error While fetching History for Chatbot"
//             })
//         }
//     }
// )

exports.getChatHistory = asyncErrorHandler(
    async (req, res, next) => {

        const chatid = req.params.chatid

        try {

            // const temp = await Chatbot.findById(chatIdObject);
            console.log('\n\n\nChat ID: ', chatid);

            const chatbotHistory = await ChatHistory.findOne({
                _id: chatid
            })


            console.log('Chatbot History: \n', chatbotHistory);
            res.status(200).json({
                success: true,
                message: "Here is your History for chat",
                history: chatbotHistory
            })
        } catch (error) {
            console.log('Error: \n', error);
            res.status(500).json({
                success: false,
                message: "Error While fetching History for Chatbot"
            })
        }
    }
)

exports.getChatIDs = asyncErrorHandler(
    async (req, res, next) => {


        console.log('Here is the Body\n', req.body);

        const { chat_name } = req.body;

        try {
            const temp = await Chatbot.findOne({ name: chat_name });
            // console.log('temp: ', temp);
            const chats = await ChatHistory.find({ user: req.user._id, chatbot: temp._id })

            // console.log('temp: ', chats);
            const history = chats.map((e) => ({ id: e._id, title: e.title }))
            console.log('temp: ', history);

            res.status(200).json({
                success: true,
                history
            })

        } catch (error) {
            console.log('chat name: ', chat_name);
            res.status(500).json({
                success: false,
                message: 'There is Some error while fetchinig ids',
                error
            })
        }

    }
);