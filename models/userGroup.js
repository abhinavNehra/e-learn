var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userGroupSchema = Schema({
  group : { type: Schema.Types.ObjectId, ref: 'Groups', required: true },
  user : { type: Schema.Types.ObjectId, ref: 'Users'},
  email : { type:String },
  status : { type:String, enum:['request','accepted','rejected','requestBNR'], default:'request'}
});

module.exports = mongoose.model('UserGroups',userGroupSchema);