var ActivityNotification = require('../models/activityNotifications');
var helper = require('../helper/response');
var validator = require('validator');

module.exports = {
	addNotifications : function(req, res, next){
		
		new ActivityNotification({
			activity:req.body.activity,
			activityOwner:req.body.activityOwner,
			from:req.user._id,
			type:"share",
			shareWith:req.body.shareWith,
		}).save(function(err, activityNotifications){
			if(err)
				res.json(helper.responseObject(422, err, null, true));
			else{
				req.result = activityNotifications;
				next();
			}
		})
	}
}