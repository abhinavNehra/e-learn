// Created By Nitesh Jatav  on 14/02/2016
var users = require('./users');
var auth = require('./authentication');
var modules = require('./modules');
var lessons = require('./lessons');
var actions = require('./actions');
var activity = require('./activities');
var groups = require('./groups');
var completedLessons = require('./completedLessons');
var notifications = require('./notifications');

module.exports = function(app){
	
	app.get('/',function(req, res, next){
		res.render('index');
	})
	app.use('/auth',auth);
	app.use('/users', users);
	app.use('/modules', modules);
	app.use('/lessons', lessons);
	app.use('/actions',actions);
	app.use('/activity',activity);
	app.use('/completedLessons',completedLessons);
	app.use('/groups', groups);
	app.use('/notifications',notifications);

};