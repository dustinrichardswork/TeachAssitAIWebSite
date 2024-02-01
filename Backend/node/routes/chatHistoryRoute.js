const express = require('express')
const { isAuthenticatedUser } = require('../middlewares/auth');
const { createChatHistory, getChatHistory, getChatIDs } = require('../controllers/chatHistoryController');


const router = express.Router()


router.route('/chat/get-chat-ids/').post( isAuthenticatedUser, getChatIDs);
// router.route('/chat/history/').put( isAuthenticatedUser, updateChatHistory);
router.route('/chat/history/:chatid').get( isAuthenticatedUser, getChatHistory);


module.exports = router