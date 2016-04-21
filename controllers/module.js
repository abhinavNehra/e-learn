var Module = require('../models/modules');
var Lesson = require('../models/lessons');
var CompletedLesson = require('../models/completedLesson');
var helper = require('../helper/response');
var validator = require('validator');
var q = require('q');
var _ = require('lodash');

module.exports = {
	addModule : function(req, res, next){
		Module.findOne({name:req.body.name})
		.then(function(module){
			if(!module){
				(new Module(req.body)).save(function(err, module){
					if(err){
						res.json(helper.responseObject(422, err, null, true));
					}else {
						req.result = module;
						next();				
					}
				});
			}else{
				throw({message:"Module name must be unique"});
			}
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err, null, true));
		});
	},
	getModule : function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			Module.findOne({_id:req.params.id,deleted:false})
			.then(function(module){
				req.result = module;
				next();
			})
			.catch(function(err){
				res.json(helper.responseObject(422, err, null, true));
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	getAllModule : function(req, res, next){
		Module.find({deleted:false,name:new RegExp(req.query.name,"i")})
		.then(function(modules){
			req.result = modules;
			next();
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err, null, true));
		})
	},
	getModuleLessions: function(req, res, next){
		if (req.isAuthenticated()){
			q.all([
				Lesson.find({module:req.params.id,name:new RegExp(req.query.name,"i")}),
				CompletedLesson.find({user:req.user._id})	
			]).spread(function(lessons, completedLessons){
				var userLessons = [];
				var userLesson;
				lessons.forEach(function(lesson, index) {
					if(_.find(completedLessons, ['lesson', lesson._id])){
						userLesson = lessons[index].toObject();
						userLesson.completed = true;
						userLessons.push(userLesson);
					}else{
						userLesson = lessons[index].toObject();
						userLesson.completed = false;
						userLessons.push(userLesson);
					}
				});
				req.result = userLessons;
				next();
			});
		}else{
			Lesson.find({module:req.params.id,name:new RegExp(req.query.name,"i")},function(err, lessons){
				if(err)
					res.json(helper.responseObject(422, err, null, true));
				req.result = lessons;
				next();
			});
		}
	},
	editModule: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			var editModule = {
				name:req.body.name,
				description:req.body.description
			}
			Module.update({_id:req.params.id},{ $set : editModule},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "module not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	deleteModule : function(req, res, next){
		Module.remove({_id:req.params.id})
		.then(function(modules){
			req.result = modules;
			next();
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err, null, true));
		})
	}
}