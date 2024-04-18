const express = require('express');
const router = express.Router();
const {handleLogin,handleRegister,handleLogout, handleSendOtp} = require('../controllers/auth');
// const { authorization } = require('../middlewares/auth');

// router.post('/login', handleLogin)
router.post('/register',handleRegister)
router.post('/send-otp',handleSendOtp)

// router.get('/logout', authorization, handleLogout)

// router.get('/protected',authorization,handleProtected)




module.exports = router;