// Created By Nitesh Jatav  on 06/04/2016
var express = require('express');
var notificationController = require('../controllers/notifications');
var authHelper = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();

//router.get('/',[moduleController.getAllModule,helper.handleSuccess]);
router.post('/share',[authHelper.isLoggedIn,notificationController.addNotifications,helper.handleSuccess]);

module.exports = router;