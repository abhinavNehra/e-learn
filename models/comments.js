var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = Schema({
  user : { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  activity : { type: Schema.Types.ObjectId, ref: 'Activities', required: true },
  comment : { type: String, required: true	},
  deleted : { type: Boolean, default: false }
});

commentSchema.plugin(timestamps);

module.exports = mongoose.model('Coments',commentSchema);