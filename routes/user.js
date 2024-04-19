const express = require('express');
const router = express.Router();

const { authorization } = require('../middlewares/auth');

const {handleAddDetails,handleGetDetails} = require('../controllers/user')

router.post('/details', authorization, handleAddDetails)

router.get('/details', authorization, handleGetDetails)






module.exports = router;