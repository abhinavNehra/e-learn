// Created By Nitesh Jatav  on 10/02/2016
module.exports = {
	'mongodb' : {
		"_id" : "56b5a4df0bb35f19244f1724"
	},
	'module' : {
		"_id" : "56b5a4df0bb35f19244f1724",
		"name" : "module 8",
		"description" : "descrtion of module eight",
		"deleted" : false,
		"__v" : 0
	},
	'lesson' : {
		"_id" : "56b5bec59704ee1f2797a10d",
		"module" : "56b59d799759cff2207e08d9",
		"name" : "lesson 3",
		"basic_description" : "detailed_description",
		"detailed_description" : "detailed_description ",
		"deleted" : false,
		"__v" : 0
	},
	'login' : {
		"password":"hrhk@12345",
		"email":"demotest@damotest.com"
	},
	'addLessonData' : {
		"module":"56b4456011902bec135bf922","name":"lession 4",
		"basic_description":"lesson  four basic_description",
		"detailed_description":"lesson four detailed_description"
	},
	'localUser' : {
		"name":"Niteshkumar",
		"dob":"2/04/1991",
		"password":"hrhk@12345",
		"email":"demotest@damotest.com",
		"username":"1234abAB@"
	},
	'editUser' : {
		"name":"Nitesh",
		"dob":"2/04/1991",
		"password":"hrhk@1234",
		"email":"demotest@damotest.com"
	},
	'validEmail' : {
		"email": "nitesh.Jatav@daffodilsw.com"
	},
	'invalidEmail' : {
		"email": "test@.com"
	},
	'validUsername' : {
		"username": "1234abAB@"
	},
	'invalidUsername' : {
		"username": "12345"
	},
	'changePassword' : {
		"password":"1234abAB@",
		"email":"demotest@damotest.com",
		"password":"1234abAB@"
	}

}