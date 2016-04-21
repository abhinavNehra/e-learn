// Created By Nitesh Jatav  on 10/02/2016
var express = require('express');
var lessonController = require('../controllers/lesson');
var auth = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();
/* GET users listing. */
router.get('/',[lessonController.getCompletedLessons,helper.handleSuccess]);
router.get('/:id',[lessonController.getCompletedLesson,helper.handleSuccess]);
router.post('/',[auth.isLoggedIn,lessonController.addCompletedLesson,helper.handleSuccess]);
router.delete('/:id',[lessonController.deleteCompletedLesson,helper.handleSuccess]);

module.exports = router;