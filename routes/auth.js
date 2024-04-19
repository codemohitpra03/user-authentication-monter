const express = require('express');
const router = express.Router();
const {handleLogin,handleRegister,handleLogout} = require('../controllers/auth');
const {handleSendOtp, handleVerifyOtp} = require('../controllers/otp')
// const { authorization } = require('../middlewares/auth');

// router.post('/login', handleLogin)
router.post('/register',handleRegister)
router.post('/send-otp',handleSendOtp)
router.post('/verify-otp',handleVerifyOtp)

// router.get('/logout', authorization, handleLogout)

// router.get('/protected',authorization,handleProtected)




module.exports = router;