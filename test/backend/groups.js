// Created By Nitesh Jatav  on 10/02/2016
var assert = require('chai').assert;
var request = require('superagent');
var config = require('../../config/config');
var testData = require('./testData');
var url = config.server.host+':'+config.server.port;

describe("Lesson APIs get: "+url+"/groups",function(){
	it("should return an object",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.isObject(res.body);
			done();
		})
	});
	it("should return object not array",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.isNotArray(res.body);
			done();
		})
	});
	it("should return object must contain result key",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.property(res.body,'result');
			done();
		})
	});
	it("should return object must contain result key as array",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.isArray(res.body.result);
			done();
		})
	});
	it("should return object must contain message key",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.property(res.body,'message');
			done();
		})
	});
	it("should return object must contain statusCode key",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.property(res.body,'statusCode');
			done();
		})
	});
	it("should return object must contain error key",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.property(res.body,'error');
			done();
		})
	});
	it("should return object must contain error key with value false",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.equal(res.body.error,false);
			done();
		})
	});
	it("should return object must contain statusCode key with value 200",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.equal(res.body.statusCode,200);
			done();
		})
	});
	it("should return object must contain message key with value 'ok' ",function(done){
		request
		.get(url+'/groups')
		.end(function(err, res){
			assert.equal(res.body.message,"ok");
			done();
		})
	});
	
});

describe("Group API for group members",function(){
	it("should return an array of object ",function(done){
		var array = groupMembers();
		
		 function check(array){
			assert.isArray(array);
			done();
		};
		check(array.result);
	});
	it("should return array must contain status key",function(done){
		var array = groupMembers();
		function check(array){
			for(var i=0;i<array.length;i++) {
				assert.property(array[i],'status');
			}
			done();
		};
		check(array.result);
	});
	it("should return array must contain totalCount key",function(done){
		var array = groupMembers();
		function check(array){
			assert.property(array,'totalCount');
			done();
		};
		check(array);
	});
	it("should return array must contain group key",function(done){
		var array = groupMembers();
		function check(array){
			for(var i=0;i<array.length;i++) {
				assert.property(array[i],'group');
			}
			done();
		};
		check(array.result);
	});
	it("should return array must contain user key",function(done){
		var array = groupMembers();
		function check(array){
			for(var i=0;i<array.length;i++) {
				assert.property(array[i],'user');
			}
			done();
		};
		check(array.result);
	});
	it("should return array must contain email key",function(done){
		var array = groupMembers();
		function check(array){
			for(var i=0;i<array.length;i++) {
				assert.property(array[i],'email');
			}
			done();
		};
		check(array.result);
	});
	it("should return array must contain a group object",function(done){
		var array = groupMembers();
		function check(array){
			for(var i=0;i<array.length;i++) {
				assert.isObject(array[i].group);
			}
			done();
		};
		check(array.result);
	});
	it("should return array must contain a group object's _id",function(done){
		var array = groupMembers();
		function check(array){
			for(var i=0;i<array.length;i++) {
				assert.property(array[i].group,'_id');
			}
			done();
		};
		check(array.result);
	});
	it("should return array must contain a user ",function(done){
		var array = groupMembers();
		function check(array){
			for(var i=0;i<array.length;i++) {
				assert.isObject(array[i].user);
			}
			done();
		};
		check(array.result);
	});
	it("should return array must contain a user object's _id",function(done){
		var array = groupMembers();
		function check(array){
			for(var i=0;i<array.length;i++) {
				assert.property(array[i].user,'_id');
			}
			done();
		};
		check(array.result);
	});


});

describe("Groups API post: "+url+"/groups",function(){
	/*it("should create a group",function(done){
		var value = createGroup();
		request
		.post(url + '/groups')
		.send(value.data)
		.end(function(err, res){
			assert.isObject(res.body);
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
	});*/
	it("should return an object",function(done){
		var array = createGroup();
		function check(array){
			assert.isObject(array);
			done();
		};
		check(array.result);
	});
	it("should return array must contain a property name",function(done){
		var array = createGroup();
		function check(array){
			assert.property(array,'name');
			done();
		};
		check(array.result);
	});
	it("should return array must contain a property description",function(done){
		var array = createGroup();
		function check(array){
			assert.property(array,'description');
			done();
		};
		check(array.result);
	});
	it("should return array must contain a property owner",function(done){
		var array = createGroup();
		function check(array){
			assert.property(array,'owner');
			done();
		};
		check(array.result);
	});
	it("should return array must contain a property members array",function(done){
		var array = createGroup();
		function check(array){
			assert.isArray(array);
			done();
		};
		check(array.result.members);
	});

});


function groupMembers() {
	return {"result" : [
		 {
		  "_id": "570b79a3ccd14b262bbc7a17",
		  "group": {
		    "_id": "570b79a3ccd14b262bbc7a16",
		    "createdAt": "2016-04-11T10:17:07.761Z",
		    "updatedAt": "2016-04-11T10:17:07.761Z",
		    "name": "Testing333",
		    "description": "hrhk@1234",
		    "owner": "5707a20985d6b3cb03ef5f6b",
		    "avatar_url": "url",
		    "__v": 0,
		    "deleted": false
		  },
		  "user": {
		    "_id": "5707a20985d6b3cb03ef5f6b",
		    "createdAt": "2016-04-08T12:20:25.455Z",
		    "updatedAt": "2016-04-08T12:20:25.455Z",
		    "__v": 0,
		    "local": {
		      "dob": "2/23/2012",
		      "name": "gunjan jain",
		      "email": "gunjan@gmail.com",
		      "active": false,
		      "deleted": false,
		      "rev": 0,
		      "ambassdor": false,
		      "avatar_url": null,
		      "lastlogin_at": "2016-04-08T12:20:25.354Z",
		      "password": "$2a$08$lIDm9MBnuMBkRzhe4UVgheE.Be70/qjJoqRftrBsd.f0kn6KUMH/y"
		    }
		  },
		  "email": "gunjan@gmail.com",
		  "__v": 0,
		  "status": "request"
		}, {
		  "_id": "570b79a3ccd14b262bbc7a17",
		  "group": {
		    "_id": "570b79a3ccd14b262bbc7a16",
		    "createdAt": "2016-04-11T10:17:07.761Z",
		    "updatedAt": "2016-04-11T10:17:07.761Z",
		    "name": "Testing333",
		    "description": "hrhk@1234",
		    "owner": "5707a20985d6b3cb03ef5f6b",
		    "avatar_url": "url",
		    "__v": 0,
		    "deleted": false
		  },
		  "user": {
		    "_id": "5707a20985d6b3cb03ef5f6b",
		    "createdAt": "2016-04-08T12:20:25.455Z",
		    "updatedAt": "2016-04-08T12:20:25.455Z",
		    "__v": 0,
		    "local": {
		      "dob": "2/23/2012",
		      "name": "gunjan jain",
		      "email": "gunjan@gmail.com",
		      "active": false,
		      "deleted": false,
		      "rev": 0,
		      "ambassdor": false,
		      "avatar_url": null,
		      "lastlogin_at": "2016-04-08T12:20:25.354Z",
		      "password": "$2a$08$lIDm9MBnuMBkRzhe4UVgheE.Be70/qjJoqRftrBsd.f0kn6KUMH/y"
		    }
		  },
		  "email": "gunjan@gmail.com",
		  "__v": 0,
		  "status": "request"
		}, {
		  "_id": "570b79a3ccd14b262bbc7a17",
		  "group": {
		    "_id": "570b79a3ccd14b262bbc7a16",
		    "createdAt": "2016-04-11T10:17:07.761Z",
		    "updatedAt": "2016-04-11T10:17:07.761Z",
		    "name": "Testing333",
		    "description": "hrhk@1234",
		    "owner": "5707a20985d6b3cb03ef5f6b",
		    "avatar_url": "url",
		    "__v": 0,
		    "deleted": false
		  },
		  "user": {
		    "_id": "5707a20985d6b3cb03ef5f6b",
		    "createdAt": "2016-04-08T12:20:25.455Z",
		    "updatedAt": "2016-04-08T12:20:25.455Z",
		    "__v": 0,
		    "local": {
		      "dob": "2/23/2012",
		      "name": "gunjan jain",
		      "email": "gunjan@gmail.com",
		      "active": false,
		      "deleted": false,
		      "rev": 0,
		      "ambassdor": false,
		      "avatar_url": null,
		      "lastlogin_at": "2016-04-08T12:20:25.354Z",
		      "password": "$2a$08$lIDm9MBnuMBkRzhe4UVgheE.Be70/qjJoqRftrBsd.f0kn6KUMH/y"
		    }
		  },
		  "email": "gunjan@gmail.com",
		  "__v": 0,
		  "status": "request"
		}], "totalCount" : 2
	}
};

function createGroup() {
	return {
		"result" : {
			"name":"Testing",
			"description":"hrhk@1234",
			"owner":"56fbb9d97cf31c032002a45d",
			"avatar_url":"url",
			"members":["nitesh@gmail.com","preetisachdeva.2010@gmail.com"]
		}	
	}
};
	
