var nodemailer = require("nodemailer");
var config = require('../config/config');

responseHelper = {
	handleSuccess : function (req, res, next) {
		res.json(responseHelper.responseObject(200, "ok", req.result, false));
	},
	handleError : function(statusCode, message){
		return	{
			statusCode: statusCode ? statusCode : 500,
			message: message ? message : "error",
			result: {},
			error: true
		}
	},
	responseObject : function(statusCode, message, result ,error){
		return	{
			statusCode: statusCode ? statusCode : 200,
			message: message ? message : "ok",
			result: result ? result : {},
			error: error ? error : false
		}
	},
	mailer : function(){
		var smtpTransport = nodemailer.createTransport("SMTP",{
		    service: "Gmail",
		    auth: {
		        user: config.mailer.user,
		        pass: config.mailer.password
		    }
		});
		return smtpTransport;
	},
	getTemplate: function(name,url){
		return	"<div><b>MAND MAX</b><br>Hi "+name+"</br><p>click here to reset your password "+url+"</p>"
	},
	signupTemplate: function(email,url){
		return	"<div><b>MAND MAX</b><br>Hi "+email+"</br><p>Congratulations you are invited to join a group</p><p>click here to signup "+url+"</p>"
	}
}

module.exports = responseHelper;