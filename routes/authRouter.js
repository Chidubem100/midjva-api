const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const rateLimiter = require('express-rate-limit')
router = express.Router();

const {
    login,
    register,
    updateProfile,
    allUser
} = require('../controller/authController');

const apiLimiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    message: {
        msg: 'Too many requests made from this IP, please try again after 15 mins'
    },
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});


router.post('/register',apiLimiter,register);
router.post('/login',apiLimiter,login);
router.patch('/profile', authMiddleware,updateProfile);
router.route('/allusers').get(allUser);







module.exports = router