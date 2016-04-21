/*// Created By Nitesh Jatav  on 10/02/2016
var assert = require('chai').assert;

describe("Response Handler responseObject",function(){
	var helper = require('../../helper/response');
	it("should return object with length faur",function(done){
		assert.equal(Object.keys(helper.responseObject()).length,4);
		done();
	});
	it("should return object not array",function(done){
		assert.isNotArray(helper.responseObject());
		done();
	});
	it("should return object must contain result key",function(done){
		assert.property(helper.responseObject(),'result');
		done();
	});
	it("should return object must contain message key",function(done){
		assert.property(helper.responseObject(),'message');
		done();
	});
	it("should return object must contain statusCode key",function(done){
		assert.property(helper.responseObject(),'statusCode');
		done();
	});
	it("should return object must contain error key",function(done){
		assert.property(helper.responseObject(),'error');
		done();
	});
	it("should return object with status code 200",function(done){
		assert.equal(helper.responseObject().statusCode,200);
		done();
	});
	it("should return object with message is ok",function(done){
		assert.equal(helper.responseObject().message,"ok");
		done();
	});
	it("should return object with status code 200 if we pass only one argument with 200",function(done){
		assert.equal(helper.responseObject(200).statusCode,200);
		done();
	});
	it("should return object with message is ok if we pass second argument ok",function(done){
		assert.equal(helper.responseObject(null, "ok").message,"ok");
		done();
	});
	it("should return object with result is object if we pass third argument object",function(done){
		assert.isObject(helper.responseObject(null, "ok", {}).result);
		done();
	});
	it("should return object with error is true if we pass four argument true",function(done){
		assert.equal(helper.responseObject(null, "ok", {}, true).error,true);
		done();
	});
});
describe("Response errorHandler",function(){
	var helper = require('../../helper/response');
	it("should return object with length faur",function(done){
		assert.equal(Object.keys(helper.handleError()).length,4);
		done();
	});
	it("should return object not array",function(done){
		assert.isNotArray(helper.handleError());
		done();
	});
	it("should return object must contain result key",function(done){
		assert.property(helper.handleError(),'result');
		done();
	});
	it("should return object must contain message key",function(done){
		assert.property(helper.handleError(),'message');
		done();
	});
	it("should return object must contain statusCode key",function(done){
		assert.property(helper.handleError(),'statusCode');
		done();
	});
	it("should return object must contain error key",function(done){
		assert.property(helper.handleError(),'error');
		done();
	});
	it("should return object with status code 500",function(done){
		assert.equal(helper.handleError().statusCode,500);
		done();
	});
	it("should return object with message is error",function(done){
		assert.equal(helper.handleError().message,"error");
		done();
	});
	it("should return object with status code 404 if we pass only one argument with 404",function(done){
		assert.equal(helper.handleError(404).statusCode,404);
		done();
	});
	it("should return object with message is Not Found if we pass second argument 'Not Found'",function(done){
		assert.equal(helper.handleError(null, "Not Found").message,"Not Found");
		done();
	});
});*/