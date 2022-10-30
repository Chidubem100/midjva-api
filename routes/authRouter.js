const express = require('express');
router = express.Router();

const {
    login,
    register
} = require('../controller/auth');


router.post('/register', register)
router.route('/login').post(login)








module.exports = router