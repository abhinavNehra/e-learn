// Created By Nitesh Jatav  on 10/02/2016
var express = require('express');
var lessonController = require('../controllers/lesson');
var actionController = require('../controllers/action');
var authHelper = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();
/* GET users listing. */
router.post('/',[lessonController.addLesson,helper.handleSuccess]);
router.get('/',[lessonController.getAllLesson,helper.handleSuccess]);
router.get('/:id',[lessonController.getLesson,helper.handleSuccess]);
router.put('/:id',[authHelper.isLoggedIn,lessonController.editLesson,helper.handleSuccess]);
router.delete('/:id',[authHelper.isLoggedIn,lessonController.deleteLesson,helper.handleSuccess]);
// action api
router.post('/:id/actions',[authHelper.isLoggedIn,actionController.addAction,helper.handleSuccess]);
router.get('/:id/actions',[actionController.getAllActionBylesson,helper.handleSuccess]);
router.get('/:id/actions/:actionId',[actionController.getAction,helper.handleSuccess]);
router.delete('/:id/actions/actionId',[authHelper.isLoggedIn,actionController.deleteActionPhysically,helper.handleSuccess]);
router.put('/:id/actions/:actionId/save',[authHelper.isLoggedIn,actionController.saveAction,helper.handleSuccess]);

module.exports = router;