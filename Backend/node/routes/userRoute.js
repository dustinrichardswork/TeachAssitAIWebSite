const express = require('express');
const {
    registerUser,
    loginUser,
    logoutUser,
    getUserDetails,
    getAllUsers,
    getUsage,
    verifyOTP,
    resendOTP,
    updateUserDetails,
    changePassword,
    changeEmail,
    deleteAccount,
    enable2FA,
    forgotPassword,
    resetPassword,
    cancelPlan,
    userDeletedByAdmin,
    googleTranslator
} = require('../controllers/userController');

const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/auth');
const { resetLimit } = require('../middlewares/requestLimit');

const router = express.Router();

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);

router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);

router.route('/me').get(isAuthenticatedUser, getUserDetails);
router.route('/me').put(isAuthenticatedUser, updateUserDetails);

router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUsers);
router.route("/admin/users/:userId").delete(isAuthenticatedUser, authorizeRoles("admin"), userDeletedByAdmin);

router.route("/getUsage").get(isAuthenticatedUser, resetLimit, getUsage)


router.route("/verifyOTP").post(verifyOTP)
router.route("/resendOTPVerificationCode").post(resendOTP)


router.route('/changepassword').put(isAuthenticatedUser, changePassword);
router.route('/changeEmail').put(isAuthenticatedUser, changeEmail);
router.route('/account').delete(isAuthenticatedUser, deleteAccount);
router.route('/enable-2fa').put(isAuthenticatedUser, enable2FA);


router.route('/plan/cancel').put(isAuthenticatedUser, cancelPlan);

router.route('/google-bot/translate').post(isAuthenticatedUser, googleTranslator);

module.exports = router;