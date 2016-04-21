// Created By "Nitesh" on 03/02/2016
var moment = require('moment');
var server = {
	'host': 'localhost',
	'port': 3000
}
module.exports = {
	'server': {
		'host': server.host,
		'port': server.port
	},
	'keys': {
		'tokenExpireTime' : moment().add(1, 'days').valueOf(),
		'jwtTokenSecret' : 'YOUR_SECRET_STRING_ELEANING'
	},
	'database' : {
		'address' : 'mongodb://localhost/ELEARN'
	},
	'mailer': {
		'user': 'niteshpsit1@gmail.com',
		'password': 'hrhk@4321',
	},
	'facebook' : {
        'clientID'      : '1004576082921587', // your App ID
        'clientSecret'  : 'a2526c48bed77745ed6c60421395ee8b', // your App Secret
        'callbackURL'   : 'http://'+server.host+':'+server.port+'/facebook/callback'
    },
    'twitter' : {
        'consumerKey'       : 'YaMVsEehL1zPa2607ZG5gRGfA',
        'consumerSecret'    : '1DlZmUAb5piElaDn4jLsKMRTUFoCQdon9y9tykDcRv60K4SZkL',
        'callbackURL'       : 'http://'+server.host+':'+server.port+'/twitter/callback'
    },
    'google' : {
        'clientID'       : '9796472716-cr6ncdo3ume8ehb06a2vhir5gus7clor.apps.googleusercontent.com',
        'clientSecret'    : 'eYcjFcYlnEvonCOFs6Pcwxgy',
        'callbackURL'       : 'http://'+server.host+':'+server.port+'/auth/google/callback'
    },
    'linkedin' : {
        'clientID'       : '75oywg77wz9czb',
        'clientSecret'    : 'AudLGoZDNuZlW9Fs',
        'callbackURL'       : 'http://'+server.host+':'+server.port+'/linkedin/callback'
    }
};
