// Created By Nitesh Jatav  on 10/02/2016
var express = require('express');
var userController = require('../controllers/user');
var authHelper = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();
 
router.put('/',authHelper.isLoggedIn,userController.editUser,helper.handleSuccess);
router.put('/:id/password',authHelper.isLoggedIn,userController.changePassword,helper.handleSuccess);
router.put('/:id/name',authHelper.isLoggedIn,userController.changeName,helper.handleSuccess);
router.put('/:id/email',authHelper.isLoggedIn,userController.changeEmail,helper.handleSuccess);
router.put('/:id/dob',authHelper.isLoggedIn,userController.changeDob,helper.handleSuccess);
router.put('/:id/dob',authHelper.isLoggedIn,userController.changeDob,helper.handleSuccess);
router.put('/:id/avatar',authHelper.isLoggedIn,userController.changeAvatar,helper.handleSuccess);
// super admin
router.get('/',userController.getAllUser,helper.handleSuccess);
router.get('/emails',userController.getUserByEmail,helper.handleSuccess);
router.get('/name',userController.getUserByName,helper.handleSuccess);
router.delete('/:id',userController.deleteUserPhysically,helper.handleSuccess);
//notification
router.get('/notifications',userController.getAllNotification,helper.handleSuccess);
router.get('/:id/notifications',userController.getNotification,helper.handleSuccess);
router.put('/:id/notifications/:nid/seen',userController.seenNotification,helper.handleSuccess);
router.put('/:id/notifications/unseen',userController.unseenNotification,helper.handleSuccess);
router.put('/:id/groupNotifications/:nid/seen',userController.seenGrpNotification,helper.handleSuccess);

module.exports = router;
