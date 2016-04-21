var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var groupSchema = Schema({
  name : { type: String, required: true },
  description : { type: String, required: true },
  owner : { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  avatar_url : { type: String },
  deleted : { type: Boolean, default: false }
});

groupSchema.plugin(timestamps);

module.exports = mongoose.model('Groups',groupSchema);