var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupNotificationsSchema = Schema({
	from : { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	to : { type: Schema.Types.ObjectId, ref: 'Users' },
	email : { type:String },
	group : { type: Schema.Types.ObjectId, ref: 'Groups', required: true },
	type : { type:String, enum:['rejected','accepted','requested','requestBNR'], default: 'requested'},
	status : { type:String, enum:['seen','unseen','deliver'], default: 'deliver'},
	deleted : { type: Boolean, default: false }
});

groupNotificationsSchema.plugin(timestamps);

module.exports = mongoose.model('GroupNotifications',groupNotificationsSchema);