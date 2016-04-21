// Created By Nitesh Jatav  on 04/04/2016
var express = require('express'); 
var groupController = require('../controllers/groups');
var authHelper = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();

router.post('/',authHelper.isLoggedIn,groupController.createGroups,helper.handleSuccess);
router.get('/',groupController.getAllGroups,helper.handleSuccess);
router.get('/:id',authHelper.isLoggedIn,groupController.getGroup,helper.handleSuccess);
router.put('/:id',authHelper.isLoggedIn,groupController.editGroup,helper.handleSuccess);
router.delete('/:id',groupController.deleteGroup,helper.handleSuccess);
router.delete('/:id/deleteMember',authHelper.isLoggedIn,groupController.deleteMember,helper.handleSuccess);
router.post('/:id/checkMembers',authHelper.isLoggedIn,groupController.checkMembers,helper.handleSuccess);
router.put('/:id/accepted',authHelper.isLoggedIn,groupController.acceptGroupRequest,helper.handleSuccess);
router.put('/:id/rejected',authHelper.isLoggedIn,groupController.rejectGroupRequest,helper.handleSuccess);
router.get('/:id/members',authHelper.isLoggedIn,groupController.groupMembers,helper.handleSuccess);
router.get('/users/:id',authHelper.isLoggedIn,groupController.myGroups,helper.handleSuccess);

module.exports = router;