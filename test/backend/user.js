// Created By Nitesh Jatav  on 10/02/2016
var assert = require('chai').assert;
var request = require('superagent');
var config = require('../../config/config');
var testData = require('./testData');
var url = config.server.host+':'+config.server.port;

describe("Lesson APIs get: "+url+"/users/:id/notifications",function(){
	it("should return an object",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
	it("should return object must contain notifications key ",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.property(res.body.result,'notifications');
			done();
		})
	});
	it("should return object must contain totalCount key ",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.property(res.body.result,'totalCount');
			done();
		})
	});
	it("should return object must contain notifications key as array",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.isArray(res.body.result.notifications);
			done();
		})
	});
	it("should return object must contain totalCount",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.property(res.body.result,'totalCount');
			done();
		})
	});
	it("should return object must contain totalCount isNotObject",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.isNotObject(res.body.result.totalCount);
			done();
		})
	});
	it("should return object must contain newNoticationCount",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.property(res.body.result,'newNoticationCount');
			done();
		})
	});
	it("should return object must contain newNoticationCount isNotObject",function(done){
		request
		.get(url+'/users/'+testData.mongodb._id+'/notifications')
		.end(function(err, res){
			assert.isNotObject(res.body.result.newNoticationCount);
			done();
		})
	});
});