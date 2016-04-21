var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var activitySchema = Schema({
  my_community : { type: Boolean, default: true },
  user : { type: Schema.Types.ObjectId, ref: 'Users', required: true},
  lesson : { type: Schema.Types.ObjectId, ref: 'Lessons', required: true },
  module : { type: Schema.Types.ObjectId, ref: 'Modules', required: true},
  description : { type: String, required: true},
  type : { type: String, required: true},
  url : { type: String },
  likes : [{ type: Schema.Types.ObjectId, ref: 'Users' }],
  deleted : { type: Boolean, default: false }
});

activitySchema.plugin(timestamps);

module.exports = mongoose.model('Activities',activitySchema);