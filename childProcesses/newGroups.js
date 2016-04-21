"use strict";
const mongoose = require('mongoose');
const config = require('../config/config');
const UserGroup = require('../models/userGroup');
const GroupNotification = require('../models/groupNotifications');
const Groups = require('../models/groups');
const User = require('../models/users');
const loginUser = process.argv[5];
const groupId = process.argv[4];
const ownerId = process.argv[3];
const memberEmail = process.argv[2];
const helper = require('../helper/response');

mongoose.connect(config.database.address);

User.findOne({'local.email':memberEmail},(err, user)=>{
	
	if(err){
		process.exit();
	}
	else if(user){
		new UserGroup({group:groupId,user:user._id,email:memberEmail}).save((err,userGroup)=>{
			console.log("child err",err);
			console.log("child userGroup",userGroup)
			if(userGroup){
				new GroupNotification({from:loginUser,to:user._id,group:groupId}).save((err,groupNotification)=>{
					console.log("child err",err);
					console.log("child userGroup",groupNotification)
				})
			}
		})
	}else{
		new UserGroup({group:groupId,email:memberEmail,status:'requestBNR'}).save((err,userGroup)=>{
			console.log("child err",err);
			if(userGroup){
				new GroupNotification({from:loginUser,email:memberEmail,group:groupId,type:'requestBNR'}).save((err,groupNotification)=>{
					console.log("child err",err);
					console.log("child userGroup",groupNotification)
					if(groupNotification){
						let url = "http://www."+config.server.host+":"+config.server.port;
						let mailOptions = {
						    from: "MIND MAX "+config.mailer.user,
						    to: memberEmail,
						    subject: "Congrates you are invited to join a group",
						    text: "",
						    html:  helper.signupTemplate(memberEmail, url)
						}
						let smtpTransport = helper.mailer();
						smtpTransport.sendMail(mailOptions,(err, response)=>{
						    console.log("child err",err);
							console.log("child userGroup",response)
						    smtpTransport.close();
						});
					}
				})
			}
		})
	}
});