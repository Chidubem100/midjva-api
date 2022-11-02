const express = require('express');
router = express.Router();

const {
  getAllDetails,
  getDetail,
  createDetail,
  updateDetail,
  deleteDetail
} = require('../controller/mainController')



router.route('/').get(getAllDetails).post(createDetail);
router.route('/:id').get(getDetail).patch(updateDetail).delete(deleteDetail);













module.exports = router