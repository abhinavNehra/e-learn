// Created By Nitesh Jatav  on 22/02/2016
var express = require('express');
var activityController = require('../controllers/activity');
var authHelper = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();
/* GET users listing. */
router.post('/',[authHelper.isLoggedIn,activityController.addActivity,helper.handleSuccess]);
router.get('/',[activityController.getAllActivity,helper.handleSuccess]);
// to get all activity
router.get('/:id',[authHelper.isLoggedIn,activityController.getActivity,helper.handleSuccess]);
router.put('/:id',[authHelper.isLoggedIn,activityController.editActivity,helper.handleSuccess]);
router.delete('/:id',[authHelper.isLoggedIn,activityController.deleteActivityPhysically,helper.handleSuccess]);
// myspace api
router.get('/users/:id',[activityController.getActivityMyspace,helper.handleSuccess]);
router.get('/users/:id/lessons/:lessonId',[activityController.getActivityMyspaceByLesson,helper.handleSuccess]);
router.get('/users/:id/modules/:moduleId',[activityController.getActivityMyspaceByModule,helper.handleSuccess]);
// my community api
router.get('/modules/:id',[activityController.getActivityByModule,helper.handleSuccess]);
router.get('/lessons/:id',[activityController.getActivityByLesson,helper.handleSuccess]);
// commennt api
router.post('/:id/comments',[authHelper.isLoggedIn,activityController.addComment,helper.handleSuccess]);
router.get('/:id/comments',[activityController.getAllComment,helper.handleSuccess]);
router.put('/:id/comments/:commentId',[authHelper.isLoggedIn,activityController.editComment,helper.handleSuccess]);
router.delete('/:id/comments/:commentId',[authHelper.isLoggedIn,activityController.deleteComment,helper.handleSuccess]);
// like api
router.get('/:id/likes',[authHelper.isLoggedIn,activityController.activityGetLikes,helper.handleSuccess]);
router.put('/:id/likes',[authHelper.isLoggedIn,activityController.activityLikes,helper.handleSuccess]);
router.put('/:id/unlikes',[authHelper.isLoggedIn,activityController.activityUnlikes,helper.handleSuccess]);
// save notification for share activity
router.post('/:id/share',[authHelper.isLoggedIn,activityController.activityShare,helper.handleSuccess]);

module.exports = router;