const express = require('express')
const { isAuthenticatedUser } = require('../middlewares/auth')
const {
    lessonPlanner,
    quiz,
    gradeEssay,
    gradeEssayRubric,
    lessonCompQuestion,
    lessonCompChat,
    lessonCompAnswer,
    videoToQuiz,
    videoSummarize,
    mathQuizEvaluate,
    mathQuizGenerator,
    mathQuizAnswer,
    mathLessonPlanner,
    detectAI,
    powerPointPresentation,
    downdloadPresentation,
    videoChat,
    checkPlag,
    videoQuizAnswer,
    videoToQuizChat,
    chatStream,
    reportGenerator,
    quiz_analyzer,
    generateESL,
    homeworkCreator,
    testCreator,
    icebreakerIdeas,
    sendDocAndUrl,
    lessonPlannerChat,
    checkFileUpload
} = require('../controllers/chatController')
const { requestLimit } = require('../middlewares/requestLimit')
const pdfUpload = require('../utils/lib/pdfUpload')
const fileUpload = require('../utils/lib/pdfUpload')

const router = express.Router()


router.route('/stream').post(chatStream);

/*
    Lesson Planning Bot
*/
router.route('/lessonplanner').post(lessonPlanner)
router.route('/lessonplanner/chat').post(lessonPlannerChat)

/*
    General Quiz Bot
*/
router.route('/quiz').post(quiz)

/*
    Follow-up Chat
*/
router.route('/quiz/analyze').post(quiz_analyzer)

/*
    Automated Essay Scoring and Feedback Bot
*/
router.route('/gradeEssay').post( pdfUpload.single('file'), gradeEssay)
router.route('/gradeEssay/rubric').post(gradeEssayRubric)


/*
    Comprehension Lesson Generator Bot
*/
router.route('/lessonComp/questions').post(lessonCompQuestion)
router.route('/lessonComp/chat').post(lessonCompChat)
router.route('/lessonComp/answer').post(lessonCompAnswer)


/*
Maths Quiz Bot
*/
router.route('/mathquiz/gen').post(mathQuizGenerator)
router.route('/mathquiz/evaluate').post(mathQuizEvaluate)
router.route('/mathquiz/answer').post(mathQuizAnswer)


/*
    Maths Lesson Planner Bot
*/
router.route('/math/lesson').post(isAuthenticatedUser, mathLessonPlanner)
    

/*
    Video to Note Summary Bot
*/
router.route('/video/summarize').post(isAuthenticatedUser, videoSummarize)
router.route('/video/chat').post(isAuthenticatedUser, videoChat)
router.route('/video/quiz').post(videoToQuiz)
router.route('/video/quiz/chat').post(videoToQuizChat)
router.route('/video/answer').post(videoQuizAnswer)

// detect AI
router.route('/detectai').post(isAuthenticatedUser, detectAI)
router.route('/plagirism').post(isAuthenticatedUser, checkPlag)
router.route('/presentation').post(powerPointPresentation)
router.route('/presentation/download/:fileName').get(requestLimit, downdloadPresentation)

//new 6 chatbots
router.route('/report/gen').post(isAuthenticatedUser, reportGenerator)
router.route('/quiz/esl').post(isAuthenticatedUser, generateESL)
router.route('/docurl/quiz').post(isAuthenticatedUser, sendDocAndUrl)
router.route('/homework/create').post(isAuthenticatedUser, homeworkCreator)
router.route('/test/create').post(isAuthenticatedUser, testCreator)
router.route('/Icebreaker/ideas').post(isAuthenticatedUser, icebreakerIdeas)

// for increasing the setTimeout
// function setConnectionTimeout(time) {
//     var delay = typeof time === 'string'
//       ? ms(time)
//       : Number(time || 5000);
  
//     return function (req, res, next) {
//       res.connection.setTimeout(delay);
//       next();
//     }
//   }
module.exports = router