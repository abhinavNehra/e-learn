var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var completedLesonSchema = Schema({
  user : { type: Schema.Types.ObjectId, ref: 'Users', required: true},
  lesson : { type: Schema.Types.ObjectId, ref: 'Lessons', required: true }
});

module.exports = mongoose.model('CompletedLesson',completedLesonSchema);