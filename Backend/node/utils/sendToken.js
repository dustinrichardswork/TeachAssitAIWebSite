const ObjectId = require('mongodb').ObjectId;

const sendToken = (user, statusCode, res, verifiedDevice) => {
  const token = user.getJWTToken();

  const options = {
    expires: new Date(
      Date.now() + (parseInt(process.env.COOKIE_EXPIRE) || 7) * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };


  console.log('Device: ', verifiedDevice);
  console.log('UserID: ', user._id);

  let objectID = new ObjectId(verifiedDevice?.split('-')[0])
  console.log('Check Result: ', objectID.equals(user._id));


  // If 2FA is not Enabled
  if (!user.TwoFA) {
    res.status(statusCode)
      .cookie('token', token, options)
      .json({
        verified: true,
        user,
        token,
      });
  }
  else if (verifiedDevice && objectID.equals(user._id)) {
    console.log('User And Device are Verified For Login: ', verifiedDevice);
    res.status(statusCode)
      .cookie('token', token, options)
      .json({
        verified: true,
        user,
        token,
      });
  } else {
    console.log('Please Verify Your Account For SignIn: ', verifiedDevice);
    res.status(statusCode)
      .cookie('token', token, options)
      .json({
        verified: false,
        user,
        token,
      });
  }
};

module.exports = sendToken;