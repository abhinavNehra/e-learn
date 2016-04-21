var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var actionSchema = Schema({
	module : { type: Schema.Types.ObjectId, ref: 'Modules', required: true },
	lesson : { type: Schema.Types.ObjectId, ref: 'Lessons', required: true },
	description : { type: String, required: true, required: true, trim: true },
	deleted : { type: Boolean, default: false }
});

actionSchema.plugin(timestamps);

module.exports = mongoose.model('Actions',actionSchema);