var Lesson = require('../models/lessons');
var Action = require('../models/actions');
var UserAction = require('../models/userActions');
var helper = require('../helper/response');
var validator = require('validator');
var q = require('q');
var _ = require('lodash');

module.exports = {
	addAction : function(req, res, next){

		if(validator.isMongoId(req.body.lesson) && validator.isMongoId(req.params.id)){
			new Action(req.body).save(function(err, action){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = action;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	deleteActionPhysically : function(req, res, next){

		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.params.actionId)){
			Action.findById(req.params.actionId)
			.then(function(action){
				if(action){
					action.remove(function(err, removed){
						if(err)
							res.json(handler.handleError(422, err));
						req.result = { message:"Action deleted"};
						next();
					});
				}else{
					res.json(handler.handleError(422, { message:"Action Not Found"}));
				}
			});
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}	
	},
	getAction : function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.params.actionId)){
			Action.findOne({_id:req.params.actionId,deleted:false},function(err, action){
				if(err)
					res.json(handler.handleError(422, err));
				req.result = action;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	getAllActionBylesson : function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			if (req.isAuthenticated()){
				q.all([
					Action.find({lesson:req.params.id})
					.populate('module','name')
					.populate('lesson','name'),
					UserAction.find({user:req.user._id})	
				]).spread(function(actions, completedActions){
					var userActions = [];
					var userAction;
					actions.forEach(function(action, index) {
						if(_.find(completedActions, ['action', action._id])){
							userAction = actions[index].toObject();
							userAction.completed = true;
							userActions.push(userAction);
						}else{
							userAction = actions[index].toObject();
							userAction.completed = false;
							userActions.push(userAction);
						}
					});
					req.result = userActions;
					next();
				})
				.catch(function(err){
					res.json(helper.handleError(422, err));
				});
			}else{
				Action.find({lesson:req.params.id})
				.populate('module','name')
				.populate('lesson','name')
				.exec(function(err, actions){
					if(err)
						res.json(helper.handleError(422, err));
					req.result = actions;
					next();
				});	
			}
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}
	},
	saveAction: function(req, res, next){

		if(validator.isMongoId(req.body.lesson) && validator.isMongoId(req.params.actionId) && validator.isMongoId(req.params.id) && validator.isMongoId(req.body.action) && validator.isMongoId(req.body.user)){
			new UserAction(req.body).save(function(err, userAction){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = userAction;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	completeSavedAction: function(req, res, next){

		if(validator.isMongoId(req.params.Id)){
			UserAction.update({_id:req.params.id},{ $set : { status:"2" }},function(err, completed){
				if(err)
					res.json(helper.handleError(422, err));
				else if(completed.n == 1 && completed.n == 1){
					req.result = completed;
					next();
				}else
					res.json(helper.handleError(404, "already completed"));
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	getSavedAction: function(req, res, next){

		UserAction.find({user:req.user._id})
		.populate('action')
		.populate('module','name')
		.populate('lesson','name')
		.exec(function(err, userAction){
			if(err)
				res.json(helper.handleError(422, err));
			req.result = userAction;
			next();
		});
	}
}