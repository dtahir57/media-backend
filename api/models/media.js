var mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator')

var Schema = mongoose.Schema;

var mediaSchema = new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	mediaCompany: {
		type: String,
		required: true
	},
	firstName: {
		type: String,
		required: true
	},
	lastName: {
		type: String,
		required: true
	},
	address: {
		type: String
	},
	postalCode: {
		type: String
	},
	phone: {
		type: String,
		required: true
	},
	personalEmail: {
		type: String,
		required: true,
		unique: true
	},
	companyEmail: {
		type: String
	},
	position: {
		type: String,
		required: true
	},
	message: {
		type: String
	},
	status: {
		type: String
	},
	admin_notes: {
		type: String
	},
	created_at: {
		type: String
	}
});

mediaSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Media', mediaSchema);