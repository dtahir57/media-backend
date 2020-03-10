const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema;

var UserSchema = new Schema({
	id: mongoose.Schema.Types.ObjectId,
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		sparse: true,
		unique: true,
		match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
	},
	password: {
		type: String,
		required: true
	}
});

UserSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', UserSchema);