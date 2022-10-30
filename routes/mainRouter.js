const express = require('express');
router = express.Router();

const {
  getAllDetails,
} = require('../controller/mainController')



router.route('/').get(getAllDetails)













module.exports = router