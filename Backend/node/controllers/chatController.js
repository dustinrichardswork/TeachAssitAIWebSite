const axios = require('axios');
const asyncErrorHandler = require("../middlewares/asyncErrorHandler");
const { updateChatHistory, createChatHistoryAndGiveData, fetchDataFromFlaskAPI, uploadInfoUpdateUsageReadPDF } = require("../utils/chatHistoryUtil");
const api = require("../utils/api");
const Usage = require('../models/usageModel');
const UploadInfo = require('../models/uploadFileModel');

const fs = require('fs');
const path = require('path')
const pdf = require('pdf-parse');
const chatbotModel = require("../models/chatbotModel");
const chatHistoryModel = require("../models/chatHistoryModel");
const fsPromises = require("fs").promises;

exports.chatStream = (req, res) => {
    // Perform any necessary form data processing here
    const formData = req.body;
    console.log('FormData: ', formData);

    // Set up a response as a stream
    res.setHeader('Content-Type', 'application/octet-stream'); // Adjust the content type as needed

    // Simulate streaming response (you can replace this with your actual stream)
    // Introduce a 2-second delay between sending chunks
    for (let i = 0; i < 10; i++) {
        setTimeout(() => {
            res.write(`Data chunk ${i}\n`);

            // Close the response after sending the last chunk
            if (i === 9) {
                res.end();
            }
        }, i * 2000); // Delay in milliseconds (i * 2000 = 2 seconds per chunk)
    }
    // End the response to signal completion
    // res.end();
}

exports.lessonPlanner = asyncErrorHandler(async (req, res, next) => {
    res.setHeader('Content-Type', 'application/octet-stream'); // Adjust the content type as needed
    /*
        make sure that Chatbot model contains the bot name
    */

    const { body, data } = await createChatHistoryAndGiveData(req, 'Lesson Planning')

    console.log('Request Made!');

    if (data) {
        let url = '/lessonplanner'
        await fetchDataFromFlaskAPI(res, url, data, 'lesson_plan', body)
    } else {
        res.status(500).json({
            message: "Error From Lesson Planner!"
        })
    }
})

exports.lessonPlannerChat = asyncErrorHandler(async (req, res, next) => {
    res.setHeader('Content-Type', 'application/octet-stream'); // Adjust the content type as needed
    /*
        make sure that Chatbot model contains the bot name
    */

    const { body, data } = await createChatHistoryAndGiveData(req, 'Lesson Planning')

    console.log('Request Made!');

    if (data) {
        let url = '/lessonplanner/chat'
        await fetchDataFromFlaskAPI(res, url, data, 'lesson_plan', body)
    } else {
        res.status(500).json({
            message: "Error From Lesson Planner!"
        })
    }
})

exports.quiz = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
    */
    const { body, data } = await createChatHistoryAndGiveData(req, 'General Quiz')

    console.log('Request Made!');

    if (data) {
        let url = '/quiz'
        await fetchDataFromFlaskAPI(res, url, data, 'quiz', body)
    } else {
        res.status(500).json({
            message: "Error From Quiz!"
        })
    }
})


/* Essay Grading */
exports.gradeEssay = asyncErrorHandler(async (req, res, next) => {
    console.log('body: ', req.body);

    /*
    make sure that Chatbot model contains the bot name
    */

    // return;
    let { body, data } = await createChatHistoryAndGiveData(req, 'Essay Grading')

    // data = JSON.parse(data);
    if (req.savedPdfFile) {
        // converting the string object to javascript obj so that we can add more info.
        data.prompt = JSON.parse(data.prompt);

        let pdfText = await uploadInfoUpdateUsageReadPDF(req, data);

        data.prompt.essayContent = pdfText
    } else {
        console.log('file is not included');
        console.log(data);
    }

    console.log(data);

    console.log('Request Made!');

    if (data) {
        let url = '/gradeEssay'
        await fetchDataFromFlaskAPI(res, url, data, 'grades', body)
    } else {
        res.status(500).json({
            message: "Error From Quiz!"
        })
    }
})


exports.gradeEssayRubric = asyncErrorHandler(async (req, res, next) => {

    console.log('Here is body: ', req.body);

    const { chat_id, body } = req.body
    // const chatbot_name = 'Quiz Generator';

    // console.log('\n\n\n\nHere is chatID: ', chat_id);
    let data = {
        prompt: body.prompt ? body.prompt : body,
        id: req.user._id
    }

    // console.log('Request Made!');

    if (data) {
        try {
            const response = await api.post(`/gradeEssay/rubric`, data)

            if (response.statusText === 'OK') {

                const data = response.data
                res.status(200).json({
                    ...data
                })

            } else {
                res.status(500).json({
                    message: 'Error from else, after calling to api/quiz'
                })
            }
        } catch (error) {
            console.log('Error From Catch: ', error);
            res.status(500).json({
                message: 'Error from api/gradeEssary/rubric'
            })
        }

    } else {
        res.status(500).json({
            message: "Kindly provide the data!"
        })
    }
})


exports.lessonCompQuestion = asyncErrorHandler(async (req, res, next) => {

    /*
        make sure that Chatbot model contains the bot name
    */
    const { body, data } = await createChatHistoryAndGiveData(req, 'Lesson Comprehension')

    console.log('Request Made!');

    if (data) {
        let url = '/lessonComp/questions'
        await fetchDataFromFlaskAPI(res, url, data, 'questions', body)
    } else {
        res.status(500).json({
            message: "Error From Lesson Planner!"
        })
    }
})


exports.lessonCompChat = asyncErrorHandler(async (req, res, next) => {

    /*
        make sure that Chatbot model contains the bot name
    */
    const { body, data } = await createChatHistoryAndGiveData(req, 'Lesson Comprehension')

    console.log('Request Made!');

    if (data) {
        let url = '/lessonComp/chat'
        await fetchDataFromFlaskAPI(res, url, data, 'questions', body)
    } else {
        res.status(500).json({
            message: "Error From Lesson Comprehenstion! chat"
        })
    }

})


exports.lessonCompAnswer = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Lesson Comprehension')

    console.log('Request Made!');

    if (data) {
        let url = '/lessonComp/answer'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner Answer!"
        })
    }
})
exports.mathQuizGenerator = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Math Quiz Generator')

    console.log('Request Made!');

    if (data) {
        let url = '/mathquiz/gen'
        await fetchDataFromFlaskAPI(res, url, data, 'math_quiz', body)
    } else {
        res.status(500).json({
            message: "Error From Lesson Comprehenstion! chat"
        })
    }

})


exports.mathQuizEvaluate = asyncErrorHandler(async (req, res, next) => {

    console.log('Here is body: ', req.body);

    const { chat_id, body } = req.body
    const chatbot_name = 'Math Quiz Generator';

    console.log('\n\n\n\nHere is chatID: ', chat_id);
    let data = {
        prompt: body.prompt ? body.prompt : body,
        id: req.user._id
    }

    console.log('Request Made!');

    if (data) {
        try {
            const response = await api.post(`/mathquiz/evaluate`, data)

            if (response.statusText === 'OK') {

                const data = response.data

                if (chat_id) {

                    updateChatHistory(chat_id, { question: body.prompt, answer: data.questions }, res)

                } else {

                    createChatHistory(chatbot_name, req.user._id, data.questions, res);
                }

            } else {
                res.status(500).json({
                    message: 'Error from else, after calling to api/lessonComp/questions'
                })
            }
        } catch (error) {
            console.log('Error From Catch: ', error);
            res.status(500).json({
                message: 'Error from Catch api/lessonComp/questions'
            })
        }

    } else {
        res.status(500).json({
            message: "Kindly provide the data!"
        })
    }
})


exports.mathQuizAnswer = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Math Quiz Generator')

    console.log('Request Made!');

    if (data) {
        let url = '/mathquiz/answer'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})

exports.mathLessonPlanner = asyncErrorHandler(async (req, res, next) => {


    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Math Lesson Planner')

    console.log('Request Made!');

    if (data) {
        let url = '/math/lesson'
        await fetchDataFromFlaskAPI(res, url, data, 'response', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})


exports.videoSummarize = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
    */
    const { body, data } = await createChatHistoryAndGiveData(req, 'Video To Notes')

    data.prompt.userinput = "Give me the notes for this video"

    console.log('Request Made!');

    if (data) {
        let url = '/video/summarize'
        await fetchDataFromFlaskAPI(res, url, data, 'summary', body)
    } else {
        res.status(500).json({
            message: "Error From Video Summary!"
        })
    }
})

exports.videoChat = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Video To Notes')

    // data.prompt.userinput = "Give me the notes for this video"

    console.log('Request Made!');

    if (data) {
        let url = '/video/chat'
        await fetchDataFromFlaskAPI(res, url, data, 'answer', body)
    } else {
        res.status(500).json({
            message: "Error From Video Summary!"
        })
    }
})
exports.videoToQuiz = asyncErrorHandler(async (req, res, next) => {


    /*
        make sure that Chatbot model contains the bot name
    */
    const { body, data } = await createChatHistoryAndGiveData(req, 'Video To Quiz')

    console.log('Request Made!');

    if (data) {
        let url = '/video/quiz'
        await fetchDataFromFlaskAPI(res, url, data, 'video_quiz', body)
    } else {
        res.status(500).json({
            message: "Error From Video To Quiz!"
        })
    }
})


exports.videoToQuizChat = asyncErrorHandler(async (req, res, next) => {


    /*
        make sure that Chatbot model contains the bot name
    */
    const { body, data } = await createChatHistoryAndGiveData(req, 'Video To Quiz')

    console.log('Request Made!');
    data.prompt.url = ''
    data.prompt.num_question = ''
    data.prompt.quiz_type = ''
    data.prompt.userinput = data.prompt.prompt
    data.prompt.prompt = ''
    console.log('CHeck: ', data);
    // res.json({message: 'wait'})
    // return;
    if (data) {
        let url = '/video/quiz'
        await fetchDataFromFlaskAPI(res, url, data, 'video_quiz', body)
    } else {
        res.status(500).json({
            message: "Error From Video To Quiz!"
        })
    }
})
exports.videoQuizAnswer = asyncErrorHandler(async (req, res, next) => {


    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Video To Quiz')

    console.log('Request Made!');
    console.log('Data: ', data);

    if (data) {
        let url = '/video/answers'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})
/* Essay Grading */
exports.detectAI = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
    */

    // return;
    let { body, data } = await createChatHistoryAndGiveData(req, 'Detect AI')

    console.log('Detect AI!');
    // data = JSON.parse(data);
    if (req.savedPdfFile) {
        // converting the string object to javascript obj so that we can add more info.
        if (data.prompt) {
            data.prompt = JSON.parse(data.prompt);
            console.log('Here is Prompt');
        } else {
            data.prompt = {}
            console.log('prompt: initialized: ', data);
        }

        let pdfText = await uploadInfoUpdateUsageReadPDF(req, data);
        // console.log('Text: ', pdfText);
        data.prompt.text = pdfText

    } else {
        console.log('file is not included');
    }

    console.log('Request Made!');


    if (data) {
        // let url = '/detectai'
        // await fetchDataFromFlaskAPI(res, url, data, 'result', body)
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODlkOGEwY2EtMTA2NS00OGU2LWIwYTUtZTc5MzNmNzQ0NTk3IiwidHlwZSI6ImFwaV90b2tlbiJ9.HuFzl6CDslPzEBTqCy_9vVjP_3FXESHONARTS0sEKRw"
        const options = {
            method: 'POST',
            url: 'https://api.edenai.run/v2/text/ai_detection',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            data: {
                response_as_dict: true,
                attributes_as_list: false,
                show_original_response: false,
                providers: 'originalityai',
                text: data.prompt.text
            }
        };

        axios
            .request(options)
            .then(async function (response) {
                let question = null;

                const chatHistory = await chatHistoryModel.findOne({ _id: data.conversation_id });

                let title = chatHistory.title;

                if (!title) {
                    console.log('Fetching the title');
                    const titleData = { user_id: data.user_id, conversation_id: data.conversation_id };
                    console.log('11111')
                    const titles = await api.post('/chattitles', titleData);
                    console.log('22222')
                    title = titles.data.title;
                    console.log('33333')
                } else {
                    console.log('Title Already Exist');
                }
                console.log(response.data)
                const answer = []
                const filter = { _id: data.conversation_id }
                const update = { $push: { content: answer }, $set: { title: title } };
                const options = { new: true };

                console.log('preprocess data...')

                const updatedDocument = await chatHistoryModel.findOneAndUpdate(filter, update, options);

                if (updatedDocument) {
                    console.log('\n\n\nUpdated document:', updatedDocument);
                } else {
                    console.log('\n\nDocument not found.');
                }
                res.json({ answer: response.data, chat_id: data.conversation_id })
            })
            .catch(function (error) {
                console.error(error);
            });
        //
    } else {
        res.status(500).json({
            message: "Error From Detect AI!"
        })
    }
})


exports.checkPlag = asyncErrorHandler(async (req, res, next) => {


    /*
    make sure that Chatbot model contains the bot name
    */
    let { body, data } = await createChatHistoryAndGiveData(req, 'Detect AI')

    console.log('Plagiarism!');
    // data = JSON.parse(data);
    if (req.savedPdfFile) {
        // converting the string object to javascript obj so that we can add more info.
        if (data.prompt) {
            data.prompt = JSON.parse(data.prompt);
            console.log('Here is Prompt');
        } else {
            data.prompt = {}
            console.log('prompt: initialized: ', data);
        }

        let pdfText = await uploadInfoUpdateUsageReadPDF(req, data);
        // console.log('Text: ', pdfText);
        data.prompt.text = pdfText

    } else {
        console.log('file is not included');
    }

    console.log('Request Made!');


    if (data) {
        // let url = '/detectai'
        // await fetchDataFromFlaskAPI(res, url, data, 'result', body)
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiODlkOGEwY2EtMTA2NS00OGU2LWIwYTUtZTc5MzNmNzQ0NTk3IiwidHlwZSI6ImFwaV90b2tlbiJ9.HuFzl6CDslPzEBTqCy_9vVjP_3FXESHONARTS0sEKRw"
        const options = {
            method: 'POST',
            url: 'https://api.edenai.run/v2/text/plagia_detection',
            headers: {
                accept: 'application/json',
                'content-type': 'application/json',
                authorization: `Bearer ${token}`
            },
            data: {
                response_as_dict: true,
                attributes_as_list: false,
                show_original_response: false,
                providers: 'winstonai',
                text: data.prompt.text
            }
        };

        axios
            .request(options)
            .then(async function (response) {
                let question = null;

                const chatHistory = await chatHistoryModel.findOne({ _id: data.conversation_id });

                let title = chatHistory.title;

                if (!title) {
                    console.log('Fetching the title');
                    const titleData = { user_id: data.user_id, conversation_id: data.conversation_id };
                    console.log('11111')
                    const titles = await api.post('/chattitles', titleData);
                    console.log('22222')
                    title = titles.data.title;
                    console.log('33333')
                } else {
                    console.log('Title Already Exist');
                }
                console.log(response.data)
                const answer = []
                const filter = { _id: data.conversation_id }
                const update = { $push: { content: answer }, $set: { title: title } };
                const options = { new: true };

                console.log('preprocess data...')

                const updatedDocument = await chatHistoryModel.findOneAndUpdate(filter, update, options);

                if (updatedDocument) {
                    console.log('\n\n\nUpdated document:', updatedDocument);
                } else {
                    console.log('\n\nDocument not found.');
                }
                res.json({ answer: response.data, chat_id: data.conversation_id })
            })
            .catch(function (error) {
                console.error(error);
            });
    } else {
        res.status(500).json({
            message: "Error From Detect AI!"
        })
    }
})

/* PowerPoint Presentation */
exports.powerPointPresentation = asyncErrorHandler(async (req, res, next) => {

    try {

        let { body, data } = await createChatHistoryAndGiveData(req, 'Power Point')

        // data = JSON.parse(data);
        if (req.savedPdfFile) {
            // converting the string object to javascript obj so that we can add more info.
            data.prompt = JSON.parse(data.prompt);

            let { pdfText } = uploadInfoUpdateUsageReadPDF(req, data);
            data.prompt.text = pdfText
        } else {
            console.log('file is not included');
            console.log(data);
        }

        console.log('data: ', data);

        console.log('Request Made!');

        if (data) {
            let url = '/powerpoint'
            await fetchDataFromFlaskAPI(res, url, data, 'presentation_link', body)
        } else {
            console.log('vit')
            res.status(500).json({
                message: "Error From Power Point!"
            })
        }
    } catch (err) {
        console.log('error!')
    }
})

exports.createPresentation = async (req, res, next) => {
    chatbot_name = 'Power point'
    let { chat_id, body } = req.body
    const user_id = req.user.id

    // Creating the Chat History if already is not created
    if (!chat_id) {
        let chatbot = await chatbotModel.findOne({ name: chatbot_name });
        if (chatbot === null) {
            chatbot = await chatbotModel.create({ name: chatbot_name })
        }
        console.log('chatbot: ', chatbot._id);
        const chat_history = await chatHistoryModel.create({
            user: user_id,
            chatbot: chatbot._id,
            content: []
        })
        console.log('ChatHistory(Created): ', chat_history);
        chat_id = chat_history._id
    } else {
        console.log('ChatHisotry Not Created: chat_id: ', chat_id);
    }

    let question = body.prompt || null;

    const chatHistory = await chatHistoryModel.findOne({ _id: chat_id });

    let title = chatHistory.title;

    if (!title) {
        console.log('Fetching the title');
        const titleData = { user_id: user_id, conversation_id: chat_id };
        const titles = await api.post('/chattitles', titleData);
        title = titles.data.title;
    } else {
        console.log('Title Already Exist');
    }

    console.log('title: ', title);

    onUpdateChatHistory(chat_id, { question, answer }, res, title);
}


exports.downdloadPresentation = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
    */

    // return;
    // let { body, data } = await createChatHistoryAndGiveData(req, 'Power Point')

    // // data = JSON.parse(data);
    // if (req.savedPdfFile) {
    //     // converting the string object to javascript obj so that we can add more info.
    //     data.prompt = JSON.parse(data.prompt);

    //     let { pdfText } = uploadInfoUpdateUsageReadPDF(req, data);
    //     data.prompt.text = pdfText
    // } else {
    //     console.log('file is not included');
    //     console.log(data);
    // }

    // console.log(data);

    // console.log('Request Made!');

    // if (data) {
    //     let url = '/powerpoint'
    //     await fetchDataFromFlaskAPI(res, url, data, 'presentation_link', body)
    // } else {
    //     res.status(500).json({
    //         message: "Error From Power Point!"
    //     })
    // }


    let { fileName } = req.params

    try {
        // Replace 'fileURL' with the actual file URL you want to download
        const fileURL = `/GeneratedPresentations/${fileName}`;

        // Fetch the file data from the URL
        const response = await api.get(fileURL, { responseType: 'arraybuffer' });

        // Set appropriate response headers
        res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation');
        res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);

        console.log('File Sended');
        // Send the file data to the frontend
        res.send(response.data);
    } catch (error) {
        // Handle any errors
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
})

exports.reportGenerator = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Reports Generator')

    console.log('Request Made!');

    if (data) {
        let url = '/report/answer'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})

exports.generateESL = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'ESL Generator')

    console.log('Request Made!');

    if (data) {
        let url = '/esl/answer'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})

const onUpdateChatHistory = async (chat_id, answer, res, title) => {
    try {


        const filter = { _id: chat_id }
        const update = { $push: { content: answer }, $set: { title: title } };
        const options = { new: true };

        const updatedDocument = await chatHistoryModel.findOneAndUpdate(filter, update, options);

        if (updatedDocument) {
            console.log('\n\n\nUpdated document:', updatedDocument);
        } else {
            console.log('\n\nDocument not found.');
        }
        res.json({
            answer: answer.answer,
            chat_id
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Error While Updating the history. (catch)",
            error: error
        })
        console.log('\n\n\nError: \n', error);
    }
}

// exports.saveHistoryQuizFile = asyncErrorHandler(async (req, res, next) => {

//     /*
//     make sure that Chatbot model contains the bot name
// */
//     // const { body, data } = await createChatHistoryAndGiveData(req, 'Document & Web Link Quiz ')
//     const chatbot_name = 'Document & Web Link Quiz'
//     let { chat_id, body, answer } = req.body
//     const user_id = req.user.id

//     // Creating the Chat History if already is not created
//     if (!chat_id) {
//         let chatbot = await chatbotModel.findOne({ name: chatbot_name });
//         if (chatbot === null) {
//             chatbot = await chatbotModel.create({ name: chatbot_name })
//         }
//         console.log('chatbot: ', chatbot._id);
//         const chat_history = await chatHistoryModel.create({
//             user: user_id,
//             chatbot: chatbot._id,
//             content: []
//         })
//         console.log('ChatHistory(Created): ', chat_history);
//         chat_id = chat_history._id
//     } else {
//         console.log('ChatHisotry Not Created: chat_id: ', chat_id);
//     }

//     let question = body.prompt || null;

//     const chatHistory = await chatHistoryModel.findOne({ _id: chat_id });

//     let title = chatHistory.title;

//     if (!title) {
//         console.log('Fetching the title');
//         const titleData = { user_id: user_id, conversation_id: chat_id };
//         const titles = await api.post('/chattitles', titleData);
//         title = titles.data.title;
//     } else {
//         console.log('Title Already Exist');
//     }

//     console.log('title: ', title);

//     onUpdateChatHistory(chat_id, { question, answer }, res, title);

// })

exports.sendDocAndUrl = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body } = req.body;
    const chatbot_name = 'Document & Web Link Quiz'
    const user_id = req.user.id
    let chat_id = null;
    // Creating the Chat History if already is not created
    if (!chat_id) {
        let chatbot = await chatbotModel.findOne({ name: chatbot_name });
        if (chatbot === null) {
            chatbot = await chatbotModel.create({ name: chatbot_name })
        }
        console.log('chatbot: ', chatbot._id);
        const chat_history = await chatHistoryModel.create({
            user: user_id,
            chatbot: chatbot._id,
            content: []
        })
        console.log('ChatHistory(Created): ', chat_history);
        chat_id = chat_history._id
    } else {
        console.log('ChatHisotry Not Created: chat_id: ', chat_id);
    }

    const payload = body.payload

    console.log('Request Made!');

    const url = '/docurl/quiz'

    try {
        let isFile = [];
        let filePath = ''
        isFile = Object.keys(body).map(item => {
            if (item === 'file') return true;
            else return null;
        })
        console.log('is File', isFile)
        if (isFile[0] === true) {
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
            const file = body.file;
            filePath = path.join(__dirname, '../public/uploads', file.filename);
            fs.writeFileSync(filePath, file.data, 'base64');
        }

        // Forward the file and information to the Flask server
        let data = {};

        if (isFile[0] == true) {
            data = {
                filename: filePath,
                payload,
                user_id,
                conversation_id: chat_id
            }
        } else {
            data = {
                payload,
                user_id,
                conversation_id: chat_id
            }
        }
        console.log(data)

        console.log('data okay!')
        if (data) {
            await sendMessageWithFile(res, data)
        }
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: `Error from else, after calling to ${url}`,
        });
    }
})

const sendMessageWithFile = async (res, data) => {
    try {
        const flaskResponse = await api.post('/docurl/quiz', data, {
            responseType: 'stream'
        });
        let responseDataChunks = []
        const chat_id = data.conversation_id;
        // Check if the response is successful (status code 200)
        if (flaskResponse.statusText === 'OK') {
            let question = data.prompt || null;

            const chatHistory = await chatHistoryModel.findOne({ _id: chat_id });

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

            flaskResponse.data.on('data', (chunk) => {
                responseDataChunks.push(chunk);
                console.log(chunk.toString())
                res.write(chunk);
            })
            flaskResponse.data.on('end', async () => {
                const responseBodyBuffer = Buffer.concat(responseDataChunks);
                const responseBody = responseBodyBuffer.toString('utf8');

                console.log('response: ', responseBody);
                const answer = responseBody;
                updateChatHistory(chat_id, { question, answer }, res, title);
            })
        } else {
            res.status(500).json({ msg: 'Server Error!' })
        }
    } catch (err) {
        console.log(err)
    }
}

exports.quiz_analyzer = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Quiz Analyzer')

    console.log('Request Made!');

    if (data) {
        let url = '/quiz/analyze'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})

exports.homeworkCreator = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Homework creator')

    console.log('Request Made!');

    if (data) {
        let url = '/homework/creator'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})

exports.testCreator = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Test creator')

    console.log('Request Made!');

    if (data) {
        let url = '/test/creator'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})

exports.icebreakerIdeas = asyncErrorHandler(async (req, res, next) => {

    /*
    make sure that Chatbot model contains the bot name
*/
    const { body, data } = await createChatHistoryAndGiveData(req, 'Classroom Icebreaker Ideas')

    console.log('Request Made!');

    if (data) {
        let url = '/icebreaker/ideas'
        await fetchDataFromFlaskAPI(res, url, data, 'answers', body)
    } else {
        res.status(500).json({
            message: "Error From Math Lesson Planner!"
        })
    }
})

exports.checkFileUpload = asyncErrorHandler(async (req, res, next) => {
    const { body } = req.body;
    let isFile = false;
    Object.keys(body).map(item => {
        if(item === 'file') isFile = true;
    })
    if(isFile){
        const usage = await Usage.findOne({ user: req.user.id });
        if (usage) {
            if (usage.noOfFilesUploaded < usage.noOfFilesUploadedLimit) {
                usage.noOfFilesUploaded++;
                await usage.save()
                return next()
            }
        }
        console.log('going to call 429');
        return res.status(429).json({ error: 'You have exceed uploaded limit!' });
    }
    next()
})