"use strict";
const Groups = require('../models/groups');
const helper = require('../helper/response');
const validator = require('validator');
const child_process = require('child_process');
const UserGroup = require('../models/userGroup');
const emailExistence = require('email-existence');
const q = require('q');


module.exports = {
	createGroups : function(req, res, next){

		Groups.findOne({owner:req.user._id,name:req.body.name},function(err, group){
			if(err)
				res.json(helper.handleError(422, err));
			else if(group)
				res.json(helper.handleError(409, 'group name should be unique for a user'));
			else if(req.user._id != req.body.owner)
				res.json(helper.handleError(409, 'owner of group and loggedin user should be same'));
			else{
				new Groups(req.body).save(function(err, group){
					if(err)
						res.json(helper.handleError(422, err));
					else if(group){
						new UserGroup({
							group:group._id,
							user:group.owner,
							email:req.user.local.email ? req.user.local.email : null
						}).save(function(err,userGroup){
							req.result = group;
							next();
							for(let i=0; i<req.body.members.length; i++) {
								let loginUserEmail = req.user.local.email ? req.user.local.email : null;
								console.log("==local",loginUserEmail,"==members",req.body.members[i]);
								if(req.body.members[i] != loginUserEmail){
									let workerProcess = child_process.spawn('node',['childProcesses/newGroups.js',req.body.members[i],req.body.owner,group._id,req.user._id])
									workerProcess.stdout.on('data', function (data) {
										console.log('stdout: ' + data);
									});

									workerProcess.stderr.on('data', function (data) {
										console.log('stderr: ' + data);
									});

									workerProcess.on('close', function (code) {
										console.log('child process exited with code ' + code);
									});
								}
							}
						})
					}
				});
			}
		})
	},
	getAllGroups: (req, res, next)=>{
		let limit = req.query.limit ? parseInt(req.query.limit) : 12;
		let skip = req.query.skip ? parseInt(req.query.skip) : 0;
		Groups.find({},{},{ sort: { 'createdAt' : -1 } }).skip(skip).limit(limit)
		.exec((err, groups)=>{
			if(err)
				res.json(helper.handleError(422, err));
			req.result = groups;
			next();
		});
	},
	deleteGroup: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
	    	Groups.remove({_id:req.params.id},function(err, groups){
				if(err)
					res.json(helper.handleError(422, err));
				if(groups.result.ok == 1 && groups.result.ok == 1){
					UserGroup.remove({group:req.params.id},function(err ,userGroup){
						req.result = "group deleted";
						next();
					})
				}
			});
	    }else{
			res.json(helper.handleError(404, "Not Found"));
		}	
	},
	getGroup: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
	    	Groups.findOne({_id:req.params.id},function(err, group){
				if(err)
					res.json(helper.handleError(422, err));
				else if(group){
					req.result = group;
					next();
				}else{
					res.json(helper.handleError(422, "group not found"));
				}
			});
	    }else{
			res.json(helper.handleError(404, "Not Found"));
		}
	},
	acceptGroupRequest : function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.body.group) && validator.isMongoId(req.body.groupOwner) && validator.isMongoId(req.body.notificationId)){
			UserGroup.update({user:req.user._id,group:req.params.id},{ $set : { 'status': 'accepted' }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
					let workerProcess = child_process.spawn('node',['childProcesses/changeGrpStatus.js',req.user._id,req.body.group,req.body.groupOwner,req.body.notificationId,'accepted']);
					workerProcess.stdout.on('data', function (data) {
						console.log('stdout: ' + data);
					});

					workerProcess.stderr.on('data', function (data) {
						console.log('stderr: ' + data);
					});

					workerProcess.on('close', function (code) {
						console.log('child process exited with code ' + code);
					});
				}else{
					res.json(helper.handleError(422, "group not found or group deleted"));
				}
			})
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}
	},
	rejectGroupRequest: function(req, res, next){
		if(validator.isMongoId(req.params.id) && validator.isMongoId(req.body.group) && validator.isMongoId(req.body.groupOwner) && validator.isMongoId(req.body.notificationId)){
			UserGroup.update({user:req.user._id,group:req.params.id},{ $set : { 'status': 'rejected' }},function(err, change){
				if(err)
					res.json(helper.handleError(422, err));
				if(change.ok === 1 && change.n === 1){
					req.result = change;
					next();
					let workerProcess = child_process.spawn('node',['childProcesses/changeGrpStatus.js',req.user._id,req.body.group,req.body.groupOwner,req.body.notificationId,'rejected']);
					workerProcess.stdout.on('data', function (data) {
						console.log('stdout: ' + data);
					});

					workerProcess.stderr.on('data', function (data) {
						console.log('stderr: ' + data);
					});

					workerProcess.on('close', function (code) {
						console.log('child process exited with code ' + code);
					});
				}else{
					res.json(helper.handleError(422, "group not found or group deleted"));
				}
			})
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}
	},
	checkMembers: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			UserGroup.findOne({group:req.params.id,email:req.body.email},function(err, member){
				if(err)
					res.json(helper.handleError(422, err));
				if(member)
					res.json(helper.handleError(409, "already member"));
				else{
					emailExistence.check(req.body.email, function(err,result){
						if(err)
							res.json(helper.responseObject(422, err, null, true));
						else if(result === true){
							req.result = { message:"verified" };
							next();
						}else{
							res.json(helper.responseObject(422, 'email should be registered with any email provider', null, true));
						}
					});
				}
			})
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}
	},
	//api for fetching members of a group
	groupMembers : function(req, res, next){

		let limit = req.query.limit ? parseInt(req.query.limit) : 5;
		let skip = req.query.skip ? parseInt(req.query.skip) : 0;

		if(validator.isMongoId(req.params.id)){
			q.all([
				UserGroup.count({group:req.params.id, status : 'accepted'}),
				UserGroup.find({group:req.params.id, status : 'accepted'}).skip(skip).limit(limit).populate('user').populate('group')
			]).spread(function(totalCount, members){
				let result = {};
				result.members = members;
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
	editGroup: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			Groups.findOne({_id:req.params.id,owner:req.user._id},function(err, group){
				if(err)
					res.json(helper.handleError(422, err));
				else if(group){
					Groups.findOne({
							owner:req.user._id,
							name:req.body.name == group.name ? null : req.body.name,
					},function(err, groupWithSameName){

						if (err)
							res.json(helper.handleError(422, err));
						else if (groupWithSameName)
							res.json(helper.handleError(409, 'group name already exist'));
						else{
							let editGroup = {
								name: req.body.name ? req.body.name : group.name,
								avatar_url: req.body.avatar_url ? req.body.avatar_url : group.avatar_url,
								description: req.body.description ? req.body.description : group.description
							};
							Groups.update({_id:req.params.id},{ $set : editGroup},function(err, change){
								if (err)
									res.json(helper.handleError(422, err));
								req.result = change;
								next();
							});
							for(let i=0; i<req.body.members.length; i++) {
								let loginUserEmail = req.user.local.email ? req.user.local.email : null;
								UserGroup.findOne({group:req.params.id,email:req.body.members[i]},function(err, userAlreadyJoined){
									if(!userAlreadyJoined && !err){
										if(req.body.members[i] != loginUserEmail){
											let workerProcess = child_process.spawn('node',['childProcesses/newGroups.js',req.body.members[i],req.user._id,req.params.id,req.user._id])
											workerProcess.stdout.on('data', function (data) {
												console.log('stdout: ' + data);
											});

											workerProcess.stderr.on('data', function (data) {
												console.log('stderr: ' + data);
											});

											workerProcess.on('close', function (code) {
												console.log('child process exited with code ' + code);
											});
										}
									}
								})
							}				
						}
					})
				}else{
					res.json(helper.handleError(422, "group not found"));
				}
			})
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}
	},
	deleteMember: function(req, res, next){
		if(validator.isMongoId(req.params.id)){
			UserGroup.findOne({
				group:req.params.id,
				user:req.body.user
			},function(err, userGroup){
				if(err)
					res.json(helper.handleError(422, err));
				else if(!userGroup){
					res.json(helper.handleError(422, "group not found"));
				}else{
					userGroup.remove(function(err, deleted){
						if(err)
							res.json(helper.handleError(422, err));
						req.result = deleted;
						next();
					})
				}
			})
		}else{
			res.json(helper.handleError(404, "Not Found"));
		}
	},
	myGroups: function(req, res, next){
		
		UserGroup.aggregate([{$group: {_id: 'user'	}}], function(err, doc) {
			return console.log(JSON.stringify(doc));
		});
	}
}