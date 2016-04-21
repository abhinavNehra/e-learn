var User = require('../models/users');
var Activity = require('../models/activities');
var CompletedLesson = require('../models/completedLesson');
var helper = require('../helper/response');
var validator = require('validator');
var emailExistence = require('email-existence');
var authHelper = require('../helper/authentication');
var config = require('../config/config');
var q = require('q');

module.exports = {
	validateData: function(req, res, next){

		if(! validator.isEmail(req.body.email)){
			res.json(helper.responseObject(422, 'email invalid', null, true));
		}else if(! ((req.body.name).length > 2) ){
			res.json(helper.responseObject(422, 'name invalid', null, true));
		}else if(! validator.isDate(req.body.dob)){
			res.json(helper.responseObject(422, 'Date invalid',  null, true));
		}else if(! ((req.body.password).length > 5) ){
			res.json(helper.responseObject(422, err, 'password invalid', true));	
		}else{
			next();
		}
	},
	totalAccounts : function(req, res, next){
		User.find({},function(err, users){
			if (err)
				res.json(helper.responseObject(422, err, null, true));
			req.result = {totalAccounts:users.length}
			next();
		});
	},
	validateUsername : function(req, res, next){
		var regularExpression  = /^(?=.*[0-9])(?=.*[A-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
		if(regularExpression.test(req.body.username)) {
		  User.findOne({username:req.body.username},function(err, user){
		  	if(err)
		  		res.json(helper.responseObject(422, err, null, true));
		  	else if(user){
		  		req.result = {"message":"username already exist"};
		  		next();
		  	}
		  	req.result = {"message":"verified"};
		  	next();
		  })
		}else{
			req.result = {"message":"invalid username"};
		  	next();
		}
	},
	validateEmail : function(req, res, next){
		if(validator.isEmail(req.body.email)){
			User.findOne({'local.email':req.body.email,'local.password':{$ne:null}},function(err, user){
				if(err)
					res.json(helper.responseObject(422, err, null, true));
				else if(user){
					res.json(helper.responseObject(422, "email already registered", null, true));
				}else {
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
			});
		}else {
			res.json(helper.responseObject(422, 'email invalid', null, true));
		}
	},
	totalActivitys : function(req, res, next){
		Activity.find({},function(err, activities){
			if(err)
				res.json(helper.responseObject(422, err, null, true));
			req.result = {totalActivities:activities.length}
			next();	
		})
	},
	totalCompletedLesson : function(req, res, next){
		CompletedLesson.find({},function(err, completedLesson){
			if(err)
				res.json(helper.responseObject(422, err, null, true));
			req.result = {totalCompletedLessons:completedLesson.length}
			next();
		})
	},
	getStatistics : function(req, res, next){
		q.all([
			CompletedLesson.find({}),
			Activity.find({}),
			User.find({})
		]).spread(function(completedLesson, activities, users){
			req.result = {
				statistics: {
					totalCompletedLessons:completedLesson.length,
					totalActivities:activities.length,
					totalAccounts:users.length
				}
			}
			next();
		})
		.catch(function(err){
			res.json(helper.responseObject(422, err, null, true));
		})
	},
	forgetPassword : function(req, res, next){
		
		if(req.body.email && !validator.isEmail(req.body.email))
			res.json(helper.responseObject(422, 'email invalid', null, true));
		else {
			User.findOne({'local.email':req.body.email},function(err, user){
				if(err)
					res.json(helper.responseObject(422, err, null, true));
				else if(!user){
					res.json(helper.responseObject(422, {message:"Given email is not register"}, null, true));
				}
				else {
					var url = req.body.url ? req.body.url : "http://www."+config.server.host+":"+config.server.port;
					var newPassword = Math.floor((Math.random() * 10000000) + 1);
					var mailOptions = {
					    from: "MIND MAX "+config.mailer.user,
					    to: "niteshpsit@gmail.com",
					    subject: "forget password",
					    text: "",
					    html: "<div>Your new password is "+newPassword+" to login go to "+url+"</div>" // html body
					}
					var smtpTransport = helper.mailer();
					smtpTransport.sendMail(mailOptions, function(err, response){
					    if(err)
					        res.json(helper.responseObject(422, err, null, true));
					    else{
					        newPassword = user.generateHash(newPassword);
							User.update({
								'local.email':req.body.email},{
								$set: { 'local.password': newPassword }
							},function(err, user){
								if(err)
							        res.json(helper.responseObject(422, err, null, true));
							    if(user.ok == 1){
									req.result = { message: "New password has been changed to your registered "+req.body.email+" account" };
									next();    	
							    }
							})
					    }
					    smtpTransport.close();
					});
				}
			});
		}
	},
	saveNewPassword : function(req, res, next){ 
		
		if(req.body.email && !validator.isEmail(req.body.email))
			res.json(helper.responseObject(422, { message:"Invalid email"}, null, true));
		if(req.body.password && req.body.confirmPassword && req.body.password !== req.body.confirmPassword )
			res.json(helper.responseObject(422, { message:"password and confirmPassword should be match"}, null, true));
		else{
			User.findOne({'local.email':req.body.email},function(err, user){
				if(err)
					res.json(helper.responseObject(422, err, null, true));
				else if(!user)
					res.json(helper.responseObject(422, {message:"Given email is not register"}, null, true));
				else {
					var password = user.generateHash(req.body.password);
					User.update({
						'local.email':req.body.email},{
						$set: { 'local.password': password }
					},function(err, user){
						if(err)
					        res.json(helper.responseObject(422, err, null, true));
					    if(user.ok == 1){
							req.result = { message: "Password has been changed" };
							next();    	
					    }
					})
				}
			});
		}
	},
	resetPassword: function(req, res, next){
		if(req.body.email && !validator.isEmail(req.body.email))
			res.json(helper.responseObject(422, 'email invalid', null, true));
		else {
			User.findOne({'local.email':req.body.email,'local.password':{$ne: null}},function(err, user){
				if(err)
					res.json(helper.responseObject(422, err, null, true));
				else if(!user){
					res.json(helper.responseObject(422, {message:"Given email is not register"}, null, true));
				}
				else {
					var userToken = authHelper.getToken(req.body.email);
					var url = req.body.url ? req.body.url+"?user="+userToken : "http://www."+config.server.host+":"+config.server.port+"?user="+userToken;
					var mailOptions = {
					    from: "MIND MAX "+config.mailer.user,
					    to: req.body.email,
					    subject: "forget password",
					    text: "",
					    html:  helper.getTemplate(user.local.name, url)
					}
					var smtpTransport = helper.mailer();
					smtpTransport.sendMail(mailOptions, function(err, response){
					    if(err)
					        res.json(helper.responseObject(422, err, null, true));
					    else{
					        req.result = { message: "link send to your email" };
							next(); 
					    }
					    smtpTransport.close();
					});
				}
			});
		}
	},
	newPassword: function(req, res, next){
		if(req.body.email && !validator.isEmail(req.body.email))
			res.json(helper.responseObject(422, { message:"Invalid email"}, null, true));
		if(req.body.password && req.body.confirmPassword && req.body.password !== req.body.confirmPassword )
			res.json(helper.responseObject(422, { message:"password and confirmPassword should be match"}, null, true));
		else{
			User.findOne({'local.email':req.body.email},function(err, user){
				if(err)
					res.json(helper.responseObject(422, err, null, true));
				else if(!user)
					res.json(helper.responseObject(422, {message:"Given email is not register"}, null, true));
				else {
					var password = user.generateHash(req.body.password);
					User.update({
						'local.email':req.body.email},{
						$set: { 'local.password': password }
					},function(err, user){
						if(err)
					        res.json(helper.responseObject(422, err, null, true));
					    if(user.ok == 1){
							req.result = { message: "Password has been changed" };
							next();    	
					    }
					})
				}
			});
		}
	}
}