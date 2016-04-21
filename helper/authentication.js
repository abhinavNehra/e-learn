var jwt = require('jwt-simple');
var config = require('../config/config');
var helper = require('./response');
var promise = require('q');
var bcrypt = require('bcryptjs');

module.exports = {
	getToken: function(email) {
		var iss = email;
		var token = jwt.encode({
		  iss: iss,
		  exp: config.keys.tokenExpireTime
		}, config.keys.jwtTokenSecret);
		return token;
	},
	authentication: function(req, res, next) {
		var iss = req.result._id;
		var token = jwt.encode({
		  iss: iss,
		  exp: config.keys.tokenExpireTime
		}, config.keys.jwtTokenSecret);
		req.token = token;
		next();
	},
	authValidation: function(req, res, next){
		var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
		if (token) {
			try {
				var decoded = jwt.decode(token, config.keys.jwtTokenSecret);
				if (decoded.exp <= Date.now()) {
  					res.json(helper.responseObject(400, 'Access token has expired', null));
				}else{
					req.token = token;
					req.body._id = decoded.iss;
					next();
				}
			} catch (err) {
				res.json(helper.responseObject(401, 'unauthorized', null, true));
			}
		} else {
			res.json(helper.responseObject(401, 'unauthorized', null, true));
		}
	},
	checkToken: function(req, res, next){
		var token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
		if (token) {
			try {
				var decoded = jwt.decode(token, config.keys.jwtTokenSecret);
				if (decoded.exp <= Date.now()) {
  					res.json(helper.responseObject(400, 'Access token has expired', null));
				}else{
					req.body.email = decoded.iss;
					next();
				}
			} catch (err) {
				res.json(helper.responseObject(401, 'unauthorized', null, true));
			}
		} else {
			res.json(helper.responseObject(401, 'unauthorized', null, true));
		}
	},
	isLoggedIn: function (req, res, next) {

	    if (req.isAuthenticated())
	        return next();
	    res.json(helper.responseObject(401, 'unauthorized', null, true));
	},
	isAdmin: function (req, res, next) {

	    if (req.isAuthenticated() && req.user.ambassdor)
	        return next();
	    else if(req.isAuthenticated())
	    	res.json(helper.responseObject(401, 'you are not admin', null, true));
	    res.json(helper.responseObject(401, 'unauthorized', null, true));
	},
	convertDataToHashCode :	function(data){
		var deferred  =	Promise.defer();
		bcrypt.genSalt(10, function(err, salt) {
		    bcrypt.hash(data, salt, function(err, hash) {
		        if(hash) {
		        	deferred.resolve(hash);
		        }
		        else {
		        	deferred.reject('not convert');
		        }
		    });
		});
		return deferred.promise;
	},
	compareDataToHashCode :	function(data, hash){
		var deferred  =	Promise.defer();
		bcrypt.compare(data, hash, function(error, res) {
	    	if(res){
	    		return deferred.resolve('matched');
	    	}
	    	else if(error){
	    		return deferred.reject(error)
	    	}
	    	else{
	    		return deferred.resolve('unmatched');
	    	}
		});
		return deferred.promise;
	}
}