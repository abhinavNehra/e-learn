"use strict";
const mongoose = require('mongoose');
const config = require('../config/config');
const GroupNotification = require('../models/groupNotifications');
const helper = require('../helper/response');
const loginUser = process.argv[2];
const groupId = process.argv[3];
const groupsOwner = process.argv[4];
const notificationId = process.argv[5];

mongoose.connect(config.database.address);
console.log("========in changegrpStatus");
if(process.argv[6] == "accepted"){
	console.log("=====in accepted");
	new GroupNotification({from:loginUser,to:groupsOwner,group:groupId,type:'accepted'}).save((err, groupNotification)=>{
		console.log("=err",err);
		console.log("=groupNotification",groupNotification);
		GroupNotification.update({_id:notificationId,deleted:false},{ $set : { 'deleted': true }},(err, change)=>{
			console.log("==err",err);
			console.log("==change",change);
		})
	})
}else if(process.argv[6] == "rejected"){
	console.log("=====in rejected");
	new GroupNotification({from:loginUser,to:groupsOwner,group:groupId,type:'rejected'}).save((err, groupNotification)=>{
		console.log("=err",err);
		console.log("=groupNotification",groupNotification);
		GroupNotification.update({_id:notificationId,deleted:false},{ $set : { 'deleted': true }},(err, change)=>{
			console.log("==err",err);
			console.log("==change",change);
		})
	})
}