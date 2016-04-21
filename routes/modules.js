// Created By Nitesh Jatav  on 10/02/2016
var express = require('express');
var moduleController = require('../controllers/module');
var auth = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();
/* GET users listing. */
router.get('/',[moduleController.getAllModule,helper.handleSuccess]);
router.get('/:id',[moduleController.getModule,helper.handleSuccess]);
router.get('/:id/lessons',[moduleController.getModuleLessions,helper.handleSuccess]);
router.post('/',[moduleController.addModule,helper.handleSuccess]);
router.put('/:id',[moduleController.editModule,helper.handleSuccess]);
router.delete('/:id',[moduleController.deleteModule,helper.handleSuccess]);

module.exports = router;