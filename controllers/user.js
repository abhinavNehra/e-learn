"use strict";
var User = require('../models/users');
var ActivityNotification = require('../models/activityNotifications');
var GroupNotification = require('../models/groupNotifications');
var helper = require('../helper/response');
var validator = require('validator');
var authHelper = require('../helper/authentication');
var q = require('q');
var _ = require('lodash');

module.exports = {

	editUser: function(req, res, next){

		User.findById(req.user._id,function(err, user){
			if(err)
				res.json(helper.responseObject(422, err, null, true));
			if(req.body.rev && user.local.rev == req.body.rev){
				var update = {local:{}};
				update.local.avatar_url = req.body.avatar_url ? req.body.avatar_url : user.local.avatar_url;
				update.local.name = req.body.name ? req.body.name : user.local.name;
				update.local.dob = req.body.dob ? req.body.dob : user.local.dob;
				update.local.rev = Number(req.body.rev) ? Number(req.body.rev) + 1 :  Number(user.local.rev) + 1

				update.local.email = user.local.email;
				update.local.lastlogin_at = user.local.lastlogin_at;
				update.local.ambassdor = user.local.ambassdor;
				update.local.deleted = user.local.deleted;
				update.local.password = req.body.password ? user.generateHash(req.body.password) : user.local.password;

				User.update({_id:req.user._id},{ $set : update}, { multi: true },function(err, user){
					if(err)
						res.json(helper.responseObject(422, err, null, true));
					if(user.ok == 1){
						User.findById(req.user._id, function(err, updatedUser){
							if(err)
								res.json(helper.responseObject(422, err, null, true));
							if(updatedUser){
								req.user = updatedUser;
								req.result = updatedUser;
								next();
							}
						})
					}	
				})
			}else{
				res.json(helper.responseObject(409, { message: 'someone else updated the value just before' , user : user}, null, true));
			}	
		})
	},
	deleteUserPhysically: function(req, res, next){
		User.findOne({_id:req.params.id},function(err, user){
			if (err)
				res.json(helper.responseObject(422, err, null, true));
			else if(user){
				user.remove(function(err, removed){
					if (err)
						res.json(helper.responseObject(422, err, null, true));
					if(removed){
						req.result = { message:"user deleted"};
						next();
					}else{
						req.result = { message:"Not deleted"};
						next();
					}
				})
			}
			else
				res.json(helper.responseObject(422, { message: "user not found"}, null, true));
		})
	},
	getNotification: function(req ,res, next){
		if(validator.isMongoId(req.params.id)){
			var limit = req.query.limit ? parseInt(req.query.limit) : 12;
			var skip = req.query.skip ? parseInt(req.query.skip) : 0;
			q.all([
				GroupNotification.count({to:req.params.id,status:'deliver',deleted: false}),
				ActivityNotification.count({activityOwner:req.params.id,deleted: false,status:'deliver',from:{$ne: req.params.id}}),
				GroupNotification.count({to:req.params.id,deleted: false}),
				ActivityNotification.count({activityOwner:req.params.id,deleted: false,from:{$ne: req.params.id}}),
				GroupNotification.find({to:req.params.id,deleted: false},{},{ sort: { 'createdAt' : -1 }}).populate('from').populate('group','name').skip(skip).limit(limit),
				ActivityNotification.find({activityOwner:req.params.id,deleted: false,from:{$ne: req.params.id}},{},{ sort: { 'createdAt' : -1 }}).populate('activity').populate('from').skip(skip).limit(limit)
			]).spread(function(grpNtnCount,actNtnCount,grpNtnTCount,actNtnTCount,groupNotifications, activityNotifications){
				let result = {};
				let grpAndActivitynotifications = groupNotifications.concat(activityNotifications);
				grpAndActivitynotifications.sort(function(a,b) {return (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0);} ); 
				result.notifications = grpAndActivitynotifications;
				result.totalCount = grpNtnTCount + actNtnTCount;
				result.newNoticationCount = grpNtnCount + actNtnCount;
				req.result = result;
				next();			
			}).catch(function(err){
				res.json(helper.handleError(422, err));
			});
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	changePassword: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			var user = new User();
            var password = user.generateHash(req.body.password);
			User.update({_id:req.params.id},{ $set : { 'local.password': password }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "user not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	changeName: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			User.update({_id:req.params.id},{ $set : { 'local.name': req.body.name }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "user not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	changeEmail: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			User.update({_id:req.params.id},{ $set : { 'local.email': req.body.email }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "user not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	changeDob: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			User.update({_id:req.params.id},{ $set : { 'local.dob': req.body.dob }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "user not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	changeAvatar: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			User.update({_id:req.params.id},{ $set : { 'local.avatar_url': req.body.avatar_url }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "user not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	getAllUser: function(req, res, next){
		User.find({},function(err, users){
			if(err)
				res.json(helper.responseObject(422, err, null, true));
			else{
				req.result = users;
				next();
			}
		})
	},
	getUserByEmail :function(req, res, next){
		User.find({"local.email":new RegExp(req.query.email,"i")},function(err, users){
			if(err)
				res.json(helper.responseObject(422, err, null, true));
			else{
				req.result = users;
				next();
			}
		});
	},
	getUserByName :function(req, res, next){
		User.find({"local.name":new RegExp(req.query.name,"i")},function(err, users){
			if(err)
				res.json(helper.responseObject(422, err, null, true));
			else{
				req.result = users;
				next();
			}
		});
	},
	seenNotification: function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.params.nid)){
			ActivityNotification.update({_id:req.params.nid},{ $set : { 'status': 'seen' }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "notification not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	},
	unseenNotification: function(req, res, next){
		q.all([
			ActivityNotification.update({activityOwner:req.params.id,'status':'deliver'},{ $set : { 'status': 'unseen' }},{multi: true}),
			GroupNotification.update({to:req.params.id,'status':'deliver'},{ $set : { 'status': 'unseen' }},{multi: true})
		]).spread(function(changeAct, changeGro){
			req.result = changeAct;
			next();			
		}).catch(function(err){
			res.json(helper.handleError(422, err));
		});
	},
	getAllNotification: function(req, res, next){
		q.all([
			ActivityNotification.find(),
			GroupNotification.find()
		]).spread(function(activityNotifications, groupNotifications){
			req.result = activityNotifications.concat(groupNotifications);
			next();			
		}).catch(function(err){
			res.json(helper.handleError(422, err));
		});
	},
	seenGrpNotification: function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.params.nid)){
			GroupNotification.update({_id:req.params.nid},{ $set : { 'status': 'seen' }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
				}else{
					res.json(helper.handleError(422, "notification not found sorry"));
				}
			})
		}else{
			res.json(handler.handleError(404, "Not Found"));
		}
	}
}