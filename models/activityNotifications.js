var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activityNotificationsSchema = Schema({
	activity : { type: Schema.Types.ObjectId, ref: 'Activities', required: true },
	activityOwner : { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	from : { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	type : { type:String, enum:['like','share','unlike']},
	status : { type:String, enum:['seen','unseen','deliver'], default: "deliver"},
	deleted : { type: Boolean, default: false }
});

activityNotificationsSchema.plugin(timestamps);

module.exports = mongoose.model('ActivityNotifications',activityNotificationsSchema);