const express = require('express');
const { 
    
    processPayment, createSubscription, cancelSubscription

} = require('../controllers/paymentController');

const { isAuthenticatedUser } = require('../middlewares/auth');

const router = express.Router();

router.route('/payment/process').post(isAuthenticatedUser ,processPayment);
router.route('/payment/create-subscription').post(isAuthenticatedUser , createSubscription);
router.route('/payment/cancel-subscription').delete(isAuthenticatedUser , cancelSubscription);


module.exports = router;