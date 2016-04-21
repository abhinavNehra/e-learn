// Created By Nitesh Jatav  on 10/02/2016
var assert = require('chai').assert;
var request = require('superagent');
var config = require('../../config/config');
var testData = require('./testData');
var url = config.server.host+':'+config.server.port;

/*describe("User APIs post "+url+"/signup",function(){
	it("should return an object",function(done){
		request
		.post(url+'/signup')
		.send(testData.localUser)
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
			assert.property(res.body.result,"createdAt");
			assert.isNotNull(res.body.result.createdAt);
			assert.property(res.body.result,"updatedAt");
			assert.isNotNull(res.body.result.updatedAt);
			assert.property(res.body.result,"_id");
			assert.isNotNull(res.body.result._id);
			assert.property(res.body.result,"local");
			assert.isNotNull(res.body.result.local);
			assert.property(res.body.result.local,"name");
			assert.isNotNull(res.body.result.local.name);
			assert.property(res.body.result.local,"dob");
			assert.isNotNull(res.body.result.local.dob);
			assert.property(res.body.result.local,"email");
			assert.isNotNull(res.body.result.local.email);
			assert.property(res.body.result.local,"password");
			assert.isNotNull(res.body.result.local.password);
			assert.property(res.body.result.local,"rev");
			assert.isNotNull(res.body.result.local.rev);
			assert.property(res.body.result.local,"ambassdor");
			assert.equal(res.body.result.local.ambassdor,false);
			userId = res.body.result._id;
			done();
		})
	});
	it("should delete registered user",function(done){

		request
		.delete(url+'/users/'+userId)
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
			assert.property(res.body.result,'message');
			assert.equal(res.body.result.message,'user deleted');
			done();
		})
	});
});*/
/*describe("User APIs post "+url+"/admin/signup",function(){
	it("should return an object",function(done){
		request
		.post(url+'/admin/signup')
		.send(testData.localUser)
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
			assert.property(res.body.result,"createdAt");
			assert.isNotNull(res.body.result.createdAt);
			assert.property(res.body.result,"updatedAt");
			assert.isNotNull(res.body.result.updatedAt);
			assert.property(res.body.result,"_id");
			assert.isNotNull(res.body.result._id);
			assert.property(res.body.result,"local");
			assert.isNotNull(res.body.result.local);
			assert.property(res.body.result.local,"name");
			assert.isNotNull(res.body.result.local.name);
			assert.property(res.body.result.local,"dob");
			assert.isNotNull(res.body.result.local.dob);
			assert.property(res.body.result.local,"email");
			assert.isNotNull(res.body.result.local.email);
			assert.property(res.body.result.local,"password");
			assert.isNotNull(res.body.result.local.password);
			assert.property(res.body.result.local,"rev");
			assert.isNotNull(res.body.result.local.rev);
			assert.property(res.body.result.local,"ambassdor");
			assert.equal(res.body.result.local.ambassdor,true);
			userId = res.body.result._id;
			done();
		})
	});
	it("should delete registered user",function(done){

		request
		.delete(url+'/users/'+userId)
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
			assert.property(res.body.result,'message');
			assert.equal(res.body.result.message,'user deleted');
			done();
		})
	});
});*/
/*describe("User APIs post "+url+"/login",function(){
	it("should able to signup",function(done){
		request
		.post(url+'/signup')
		.send(testData.localUser)
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
			userId = res.body.result._id;
			done();
		})
	});
	it("should return an object",function(done){
		request
		.post(url+'/login')
		.send(testData.login)
		.end(function(err, res){
			assert.isObject(res.body);
			assert.equal(Object.keys(res.body).length,4);
			assert.isNotArray(res.body);
			assert.property(res.body,'result');
			assert.isObject(res.body.result);
			assert.property(res.body,'message');
			assert.property(res.body,'statusCode');
			assert.property(res.body,'error');
			assert.equal(res.body.error,false);
			assert.equal(res.body.statusCode,200);
			assert.equal(res.body.message,"ok");
			assert.isObject(res.body.result);
			assert.property(res.body.result,"createdAt");
			assert.isNotNull(res.body.result.createdAt);
			assert.property(res.body.result,"updatedAt");
			assert.isNotNull(res.body.result.updatedAt);
			assert.property(res.body.result,"_id");
			assert.isNotNull(res.body.result._id);
			assert.property(res.body.result,"local");
			assert.isNotNull(res.body.result.local);
			assert.property(res.body.result.local,"name");
			assert.isNotNull(res.body.result.local.name);
			assert.property(res.body.result.local,"dob");
			assert.isNotNull(res.body.result.local.dob);
			assert.property(res.body.result.local,"email");
			assert.isNotNull(res.body.result.local.email);
			assert.property(res.body.result.local,"password");
			assert.isNotNull(res.body.result.local.password);
			assert.property(res.body.result.local,"rev");
			assert.isNotNull(res.body.result.local.rev);
			done();
		})
	});
	it("should delete registered user",function(done){
		request
		.delete(url+'/users/'+userId)
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
			assert.property(res.body.result,'message');
			assert.equal(res.body.result.message,'user deleted');
			done();
		})
	});
});*/
/*describe("User APIs post "+url+"/admin/login",function(){
	it("should able to signup",function(done){
		request
		.post(url+'/admin/signup')
		.send(testData.localUser)
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
			userId = res.body.result._id;
			done();
		})
	});
	it("should return an object",function(done){
		request
		.post(url+'/admin/login')
		.send(testData.login)
		.end(function(err, res){
			assert.isObject(res.body);
			assert.equal(Object.keys(res.body).length,4);
			assert.isNotArray(res.body);
			assert.property(res.body,'result');
			assert.isObject(res.body.result);
			assert.property(res.body,'message');
			assert.property(res.body,'statusCode');
			assert.property(res.body,'error');
			assert.equal(res.body.error,false);
			assert.equal(res.body.statusCode,200);
			assert.equal(res.body.message,"ok");
			assert.isObject(res.body.result);
			assert.property(res.body.result,"createdAt");
			assert.isNotNull(res.body.result.createdAt);
			assert.property(res.body.result,"updatedAt");
			assert.isNotNull(res.body.result.updatedAt);
			assert.property(res.body.result,"_id");
			assert.isNotNull(res.body.result._id);
			assert.property(res.body.result,"local");
			assert.isNotNull(res.body.result.local);
			assert.property(res.body.result.local,"name");
			assert.isNotNull(res.body.result.local.name);
			assert.property(res.body.result.local,"dob");
			assert.isNotNull(res.body.result.local.dob);
			assert.property(res.body.result.local,"email");
			assert.isNotNull(res.body.result.local.email);
			assert.property(res.body.result.local,"password");
			assert.isNotNull(res.body.result.local.password);
			assert.property(res.body.result.local,"rev");
			assert.isNotNull(res.body.result.local.rev);
			done();
		})
	});
	it("should delete registered user",function(done){
		request
		.delete(url+'/users/'+userId)
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
			assert.property(res.body.result,'message');
			assert.equal(res.body.result.message,'user deleted');
			done();
		})
	});
});*/
describe("Lesson APIs get: "+url+"/logout",function(){
	it("should return an object",function(done){
		request
		.get(url+'/logout')
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
			assert.property(res.body.result,"message");
			assert.equal(res.body.result.message,"ok");
			done();
		})
	});
});
/*describe("User APIs put "+url+"/auth/forgetPassword",function(){
	it("should able to signup",function(done){
		request
		.post(url+'/signup')
		.send(testData.localUser)
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
			userId = res.body.result._id;
			done();
		})
	});
	it("should return an object",function(done){
		request
		.put(url+'/auth/forgetPassword')
		.send(testData.changePassword)
		.end(function(err, res){
			assert.isObject(res.body);
			assert.equal(Object.keys(res.body).length,4);
			assert.isNotArray(res.body);
			assert.property(res.body,'result');
			assert.isObject(res.body.result);
			assert.property(res.body,'message');
			assert.property(res.body,'statusCode');
			assert.property(res.body,'error');
			assert.equal(res.body.error,false);
			assert.property(res.body.result,'message');
			assert.equal(res.body.result.message,'Password has been changed');
			done();
		})
	});
	it("should delete registered user",function(done){
		request
		.delete(url+'/users/'+userId)
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
			assert.property(res.body.result,'message');
			assert.equal(res.body.result.message,'user deleted');
			done();
		})
	});
});*/
