"use strict";
var Lesson = require('../models/lessons');
var Comment = require('../models/comments');
var Activity = require('../models/activities');
var ActivityNotification = require('../models/activityNotifications');
var helper = require('../helper/response');
var validator = require('validator');
var q = require('q');

module.exports = {
	addActivity : function(req, res, next){

		if(validator.isMongoId(req.body.lesson) && validator.isMongoId(req.body.user) && validator.isMongoId(req.body.module)){
			new Activity(req.body).save(function(err, activity){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = activity;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	editActivity: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			if(req.body.description){
				Activity.update({_id:req.params.id},{ $set : { description:req.body.description }},function(err, activity){
					req.result = activity;
					next();
				})
			}else if(req.body.url){
				Activity.update({_id:req.params.id},{ $set : { url:""}},function(err, activity){
					req.result = activity;
					next();
				})
			}
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	deleteActivityPhysically : function(req, res, next){
		Activity.remove({_id:req.params.id})
		.then(function(activity){
			req.result = activity;
			next();
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err, null, true));
		})	
	},
	getActivity : function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			Activity.findOne({_id:req.params.id,deleted:false})
			.populate('user').exec(function(err, activity){
				if(activity){
					req.result = activity;
					next();
				}else if (err){
					res.json(helper.handleError(422, err));
				}else{
					req.result = {};
					next();
				}
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	getAllActivity : function(req, res, next){
		var limit = req.query.limit ? parseInt(req.query.limit) : 12;
		var skip = req.query.skip ? parseInt(req.query.skip) : 0;
		Activity.find({my_community:true},{},{ sort: { 'createdAt' : -1 } }).skip(skip).limit(limit)
		.populate('user').exec(function(err, activities){
			if(err)
				res.json(helper.handleError(422, err));
			req.result = activities;
			next();
		});	
	},
	getActivityByModule : function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			var limit = req.query.limit ? parseInt(req.query.limit) : 12;
			var skip = req.query.skip ? parseInt(req.query.skip) : 0;
			Activity.find({module:req.params.id,my_community:true},{},{ sort: { 'createdAt' : -1 } }).skip(skip).limit(limit)
			.populate('user').exec(function(err, activities){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = activities;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	getActivityByLesson : function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			var limit = req.query.limit ? parseInt(req.query.limit) : 12;
			var skip = req.query.skip ? parseInt(req.query.skip) : 0;
			Activity.find({lesson:req.params.id,my_community:true},{},{ sort: { 'createdAt' : -1 } }).skip(skip).limit(limit)
			.populate('user').exec(function(err, activities){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = activities;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	addComment : function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.body.activity) && validator.isMongoId(req.body.user) && req.body.user == req.user._id){
			new Comment(req.body).save(function(err, comment){
				if(err)
					res.json(helper.handleError(422, err));
				else if(comment){
					Comment.find({_id:comment._id}).populate('user').exec(function(err, comment){
						if(err)
							res.json(helper.handleError(422, err));
						req.result = comment;
						next();
					})
				}
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	deleteComment : function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.params.commentId)){
			Comment.findById(req.params.commentId)
			.then(function(comment){
				if(!comment)
					res.json(helper.handleError(404, "Comment not Found"));
				else if(req.user.local.ambassdor)
					res.json(helper.handleError(401, "unauthorized user for deleted comment"));
				else{
					comment.remove(function(err, removed){
						if(err)
							res.json(helper.handleError(422, err));
						req.result = { message:"comment deleted"};
						next();
					});
				}
			})
			.catch(function(err){
				res.json(helper.handleError(422, err));
			});
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}	
	},
	getAllComment : function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			var limit = req.query.limit ? parseInt(req.query.limit) : 12;
			var skip = req.query.skip ? parseInt(req.query.skip) : 0;
			q.all([
				Comment.count({activity:req.params.id,deleted:false}),
				Comment.find({activity:req.params.id,deleted:false}).skip(skip).limit(limit).populate('user')
			]).spread(function(totalCount, comments){
				let result = {};
				result.comments = comments;
				result.totalCount = totalCount;
				req.result = result;
				next();
			}).then(function(err){
				res.json(helper.handleError(422, err));
			})
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	editComment: function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.params.commentId)){
			Comment.update({_id:req.params.commentId,deleted:false},{ $set : { comment:req.body.comment }},function(err, comment){
				if(err)
					res.json(helper.responseObject(422, err, null, true));
				if(comment.ok == 1){
					Comment.findById(req.params.commentId, function(err, updateComment){
						if(err)
							res.json(helper.responseObject(422, err, null, true));
						if(updateComment){
							req.result = updateComment;
							next();
						}
					})
				}	
			})
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	activityLikes: function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.body.activityOwner)) {
			Activity.update({_id:req.params.id},{ $addToSet: { likes: req.user._id  } },function(err, like){
				if(err)
					res.json(helper.handleError(422, err));
				if(like.ok == 1){
					if(req.body.activityOwner != req.user._id){
						new ActivityNotification({
							activity: req.params.id,
							activityOwner: req.body.activityOwner,
							from: req.user._id,
							type: "like"
						}).save(function(err, notification){
							req.result = {message:"liked"};
							next();
						})
					}else{
						req.result = {message:"liked"};
						next();
					}
				}else {
					res.json(helper.handleError(404, "somethings wrongs"));	
				}
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	activityUnlikes: function(req, res, next){
		if(validator.isMongoId(req.params.id)) {
			Activity.update({_id:req.params.id},{ $pull: { likes: req.user._id  } },function(err, unlike){
				if(err)
					res.json(helper.handleError(422, err));
				if(unlike.ok == 1){
					req.result = {message:"unliked"};
					next();
				}else {
					res.json(helper.handleError(404, "somethings wrongs"));	
				}
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	getActivityMyspace: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			var limit = req.query.limit ? parseInt(req.query.limit) : 12;
			var skip = req.query.skip ? parseInt(req.query.skip) : 0;
			Activity.find({user:req.params.id},{},{ sort: { 'createdAt' : -1 } }).skip(skip).limit(limit)
			.populate('user').exec(function(err, activities){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = activities;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	getActivityMyspaceByLesson: function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.params.lessonId)){
			var limit = req.query.limit ? parseInt(req.query.limit) : 12;
			var skip = req.query.skip ? parseInt(req.query.skip) : 0;
			Activity.find({user:req.params.id,lesson:req.params.lessonId},{},{ sort: { 'createdAt' : -1 } }).skip(skip).limit(limit)
				.populate('user').exec(function(err, activities){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = activities;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	getActivityMyspaceByModule: function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.params.moduleId)){
			var limit = req.query.limit ? parseInt(req.query.limit) : 12;
			var skip = req.query.skip ? parseInt(req.query.skip) : 0;
			Activity.find({user:req.params.id,module:req.params.moduleId},{},{ sort: { 'createdAt' : -1 } }).skip(skip).limit(limit)
				.populate('user').exec(function(err, activities){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = activities;
				next();
			});
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	activityShare: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			new ActivityNotification({
				activity: req.params.id,
				activityOwner: req.body.activityOwner,
				from: req.user._id,
				type: "share"
			}).save(function(err, notification){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = {message:"share"};
				next();
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	activityGetLikes: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			Activity.find({_id:req.params.id})
				.populate('likes').exec(function(err, activity){
				if(err)
					res.json(helper.handleError(422, err));
				req.result = activity;
				next();
			});
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	}
}