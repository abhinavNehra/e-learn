// Created By Nitesh Jatav  on 10/02/2016
var assert = require('chai').assert;
var request = require('superagent');
var config = require('../../config/config');
var testData = require('./testData');
var url = config.server.host+':'+config.server.port;

describe("User APIs post: "+url+"/auth/validateEmail post with valid email",function(){
	this.timeout(10000);
	it("should return an valid object ",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.validEmail)
		.end(function(err, res){
			assert.isObject(res.body);
			assert.equal(Object.keys(res.body).length,4);
			assert.isNotArray(res.body);
			assert.property(res.body,'result');
			assert.property(res.body,'message');
			assert.property(res.body,'statusCode');
			assert.property(res.body,'error');
			assert.equal(res.body.error,false);
			assert.equal(res.body.statusCode,200);
			assert.equal(res.body.message,"ok");
			assert.isObject(res.body.result);
			assert.property(res.body,'error');
			assert.property(res.body.result,'message');
			assert.equal(res.body.result.message,'verified');
			assert.isObject(res.body);
			assert.equal(Object.keys(res.body).length,4);
			assert.isNotArray(res.body);
			assert.property(res.body,'result');
			assert.property(res.body,'message');
			assert.property(res.body,'statusCode');
			assert.property(res.body,'error');
			assert.equal(res.body.error,false);
			assert.equal(res.body.statusCode,200);
			assert.equal(res.body.message,"ok");
			assert.isObject(res.body.result);
			assert.property(res.body,'error');
			assert.property(res.body.result,'message');
			assert.equal(res.body.result.message,'verified');
			done();
		})
	});
});
describe("User APIs post: "+url+"/auth/validateUsername post with invalid username",function(){
	it("should return an object",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object with length 4",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.equal(Object.keys(res.body).length,4);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
	it("should return object must contain result key with object",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.isObject(res.body.result);
			done();
		})
	});
	it("should return object must contain result message key ",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.property(res.body.result,'message');
			done();
		})
	});
	it("should return object must contain result message:'invalid username' ",function(done){
		request
		.post(url+'/auth/validateUsername')
		.send(testData.invalidUsername)
		.end(function(err, res){
			assert.equal(res.body.result.message,'invalid username');
			done();
		})
	});
});
describe("User APIs post: "+url+"/auth/validateEmail post with invalid email",function(){
	it("should return an object",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object with length 4",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.equal(Object.keys(res.body).length,4);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value true",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.equal(res.body.error,true);
			done();
		})
	});
	it("should return object must contain statusCode key with value 422",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.equal(res.body.statusCode,422);
			done();
		})
	});
	it("should return object must contain message key with value 'email invalid' ",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.equal(res.body.message,"email invalid");
			done();
		})
	});
	it("should return object must contain result key with object",function(done){
		request
		.post(url+'/auth/validateEmail')
		.send(testData.invalidEmail)
		.end(function(err, res){
			assert.isObject(res.body.result);
			done();
		})
	});
});	
describe("User APIs post: "+url+"/auth/totalAccounts",function(){
	it("should return an object",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object with length 4",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.equal(Object.keys(res.body).length,4);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
	it("should return object must contain result key with object",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.isObject(res.body.result);
			done();
		})
	});
	it("should return object must contain result key with object and object must contain result key",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain result key totalAccounts",function(done){
		request
		.get(url+'/auth/totalAccounts')
		.end(function(err, res){
			assert.property(res.body.result,'totalAccounts');
			done();
		})
	});
});
describe("User APIs post: "+url+"/auth/totalActivitys",function(){
	it("should return an object",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object with length 4",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.equal(Object.keys(res.body).length,4);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
	it("should return object must contain result key with object",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.isObject(res.body.result);
			done();
		})
	});
	it("should return object must contain result key ",function(done){
		request
		.get(url+'/auth/totalActivitys')
		.end(function(err, res){
			assert.property(res.body.result,'totalActivities');
			done();
		})
	});
});
describe("User APIs post: "+url+"/auth/totalCompletedLesson",function(){
	it("should return an object",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object with length 4",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.equal(Object.keys(res.body).length,4);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
	it("should return object must contain result key with object",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.isObject(res.body.result);
			done();
		})
	});
	it("should return object must contain result key with totalCompletedLessons",function(done){
		request
		.get(url+'/auth/totalCompletedLesson')
		.end(function(err, res){
			assert.property(res.body.result,'totalCompletedLessons');
			done();
		})
	});
});
describe("User APIs get: "+url+"/auth/statistics",function(){
	it("should return an object",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object with length 4",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.equal(Object.keys(res.body).length,4);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
	it("should return object must contain result key with object",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.isObject(res.body.result);
			done();
		})
	});
	it("should return object must contain result statistics key ",function(done){
		request
		.get(url+'/auth/statistics')
		.send(testData.validEmail)
		.end(function(err, res){
			assert.property(res.body.result,'statistics');
			done();
		})
	});
	it("should return object must contain result key ' ",function(done){
		request
		.get(url+'/auth/statistics')
		.send(testData.validEmail)
		.end(function(err, res){
			assert.property(res.body.result.statistics,'totalCompletedLessons');
			done();
		})
	});
	it("should return object must contain result key ' totalAccounts",function(done){
		request
		.get(url+'/auth/statistics')
		.send(testData.validEmail)
		.end(function(err, res){
			assert.property(res.body.result.statistics,'totalAccounts');
			done();
		})
	});
	it("should return object must contain result key totalActivities' ",function(done){
		request
		.get(url+'/auth/statistics')
		.send(testData.validEmail)
		.end(function(err, res){
			assert.property(res.body.result.statistics,'totalActivities');
			done();
		})
	});
});
describe("User APIs get: "+url+"/auth/forgetPassword",function(){
	it("should return an object",function(done){
		request
		.get(url+'/auth/statistics')
		.end(function(err, res){
			assert.isObject(res.body);
			assert.equal(Object.keys(res.body).length,4);
			assert.isNotArray(res.body);
			assert.property(res.body,'result');
			assert.property(res.body,'message');
			assert.property(res.body,'statusCode');
			assert.property(res.body,'error');
			assert.equal(res.body.error,false);
			assert.equal(res.body.statusCode,200);
			assert.equal(res.body.message,"ok");
			assert.isObject(res.body.result);
			assert.property(res.body.result,'statistics');
			assert.property(res.body.result.statistics,'totalCompletedLessons');
			assert.property(res.body.result.statistics,'totalAccounts');
			assert.property(res.body.result.statistics,'totalActivities');
			done();
		})
	});
});