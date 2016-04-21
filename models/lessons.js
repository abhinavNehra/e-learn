var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var lessonSchema = Schema({
  module : { type: Schema.Types.ObjectId, ref: 'Modules', required: true },
  name : { type: String, required: true},
  activity : { type: String, required: true },
  Keytakeaways : { type: String, required: true },
  basic_description : { type: String, required: true},
  detailed_description : { type: String },
  deleted : { type: Boolean, default: false }
});

module.exports = mongoose.model('Lessons',lessonSchema);