// Created By Nitesh Jatav  on 10/02/2016
var express = require('express');
var authController = require('../controllers/authentication');
var authHelper = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();
/* GET users listing. */
router.post('/validateEmail',authController.validateEmail,helper.handleSuccess);
router.post('/validateUsername',authController.validateUsername,helper.handleSuccess);
router.get('/totalAccounts',authController.totalAccounts,helper.handleSuccess);
router.get('/totalActivitys',authController.totalActivitys,helper.handleSuccess);
router.get('/totalCompletedLesson',authController.totalCompletedLesson,helper.handleSuccess);
router.get('/statistics',authController.getStatistics,helper.handleSuccess);
router.post('/forgetPassword',authController.forgetPassword,helper.handleSuccess);
router.put('/forgetPassword',authController.saveNewPassword,helper.handleSuccess);
router.post('/resetPassword',authController.resetPassword,helper.handleSuccess);
router.post('/newPassword',authHelper.checkToken,authController.newPassword,helper.handleSuccess);
module.exports = router;