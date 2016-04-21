// Created By Nitesh Jatav  on 10/02/2016
var express = require('express');
var actionController = require('../controllers/action');
var authHelper = require('../helper/authentication');
var helper = require('../helper/response');
var router = express.Router();
/* GET users listing. */
/*router.post('/',[actionController.addAction,helper.handleSuccess]);
router.get('/',[actionController.getAllAction,helper.handleSuccess]);
router.get('/:id',[actionController.getAction,helper.handleSuccess]);
router.delete('/:id',[actionController.deleteActionPhysically,helper.handleSuccess]);*/
router.get('/saves',[authHelper.isLoggedIn,actionController.getSavedAction,helper.handleSuccess]);
router.put('/saves/:id',[authHelper.isLoggedIn,actionController.completeSavedAction,helper.handleSuccess]);

module.exports = router;