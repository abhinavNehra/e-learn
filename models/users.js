var timestamps = require('mongoose-timestamp');
var mongoose = require('mongoose');
var DateOnly = require('mongoose-dateonly')(mongoose);
var bcrypt = require('bcrypt-nodejs');
var Schema = mongoose.Schema;

var userSchema = Schema({
	local	: {
		email: { type: String },
		password : { type: String, default: null},
		name : { type: String },
		dob : { type: String },
		lastlogin_at : {type: Date, default: Date.now},
		avatar_url : { type: String, default: null},
		ambassdor : { type: Boolean, default: false },
		id: { type: String },
		token: { type: String },
		rev : { type: Number, default: 0 },
		deleted : { type: Boolean, default: false },
		active : { type: Boolean, default: false }
	}
});

userSchema.plugin(timestamps);

userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = mongoose.model('Users',userSchema);
