var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupActivitySchema = Schema({
  group : { type: Schema.Types.ObjectId, ref: 'Groups' },
  activity : { type: Schema.Types.ObjectId, ref: 'Activities' }
  deleted : { type: Boolean, default: false }
});

groupActivitySchema.plugin(timestamps);

module.exports = mongoose.model('GroupActivity',groupActivitySchema);