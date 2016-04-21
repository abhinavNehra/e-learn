var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userActionSchema = Schema({
	module : { type: Schema.Types.ObjectId, ref: 'Modules', required: true },
	user : { type: Schema.Types.ObjectId, ref: 'Users', required: true },
	lesson : { type: Schema.Types.ObjectId, ref: 'Lessons', required: true },
	action : { type: Schema.Types.ObjectId, ref: 'Actions', required: true },
	status : { type:String, enum:['1','2'], default:'1'},
	deleted : { type: Boolean, default: false }
});

userActionSchema.plugin(timestamps);

module.exports = mongoose.model('UserActions',userActionSchema);