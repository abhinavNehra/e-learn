// Created By Nitesh Jatav  on 10/02/2016
var assert = require('chai').assert;
var request = require('superagent');
var config = require('../../config/config');
var testData = require('./testData');
var url = config.server.host+':'+config.server.port;

describe("Lesson APIs get: "+url+"/lessons",function(){
	it("should return an object",function(done){

		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object with length 4",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.equal(Object.keys(res.body).length,4);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.get(url+'/lessons')
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
});
describe("Lesson APIs get: "+url+"/lessons/:id",function(done){
	var lessonId = testData.lesson._id;
	it("should return an object",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
	it("should return object must contain result key with object",function(done){
		request
		.get(url+'/lessons/'+lessonId)
		.end(function(err, res){
			assert.isObject(res.body.result);
			done();
		})
	});
});
describe("Lesson APIs get: "+url+"/modules/anything",function(){
	it("should return an object",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value true",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.equal(res.body.error,true);
			done();
		})
	});
	it("should return object must contain statusCode key with value 404",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.equal(res.body.statusCode,404);
			done();
		})
	});
	it("should return object must contain message key with value 'Not Found' ",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.equal(res.body.message,"Not Found");
			done();
		})
	});
	it("should return object must contain result key with object",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.isObject(res.body.result);
			done();
		})
	});
	it("should return object must contain result key with blank object",function(done){
		request
		.get(url+'/lessons/anything')
		.end(function(err, res){
			assert.equal(Object.keys(res.body.result).length,0);
			done();
		})
	});
});

