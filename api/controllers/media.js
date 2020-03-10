const mongoose = require('mongoose');
const Media = require('../models/media');

const transporter = require('../mail/config');

exports.get_all_applications = (req, res, next) => {
	Media.find()
	.select('_id mediaCompany firstName lastName address postalCode phone personalEmail companyEmail position message status created_at')
	.exec()
	.then(docs => {
		const response = {
			count: docs.length,
			code: 200,
			data: docs
		};
		if(docs.length >= 0) {
			res.status(200).json(response);
		} else {
			res.status(404).json({
				code: 404,
				message: 'No Data Found'
			});
		}
	})
	.catch(error => {
		res.status(500).json({
			code: 500,
			error: error
		});
		console.log(error);
	});
}

exports.store_media_application = (req, res, next) => {
	var today = new Date();
	var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
	var media = new Media({
		_id: new mongoose.Types.ObjectId(),
		mediaCompany: req.body.media_company,
		firstName: req.body.first_name,
		lastName: req.body.last_name,
		address: req.body.address,
		postalCode: req.body.postal_code,
		phone: req.body.phone,
		personalEmail: req.body.personal_email,
		companyEmail: req.body.company_email,
		position: req.body.position,
		message: req.body.message,
		created_at: date
	});
	media.save().then(result => {
		console.log(result);
		let HelperOptions = {
			from: "noreply@media_akkerditation.com",
			to: req.body.personal_email,
			subject: "Media Akkreditation Application",
			text: "Hi " +req.body.first_name+ " " + req.body.last_name + ",\n Thank You for your request, we will review your application as soon as possible. \n Kind Regards!"
		}
		transporter.sendMail(HelperOptions, (error, info) => {
			if (error) {
				res.status(500).json({
					error: error
				});
			} else {
				console.log("Mail was sent")
			}

		});
		res.status(200).json({
			code: 200,
			message: 'Media Application Request Sent',
			createdRecord: media
		});
	}).catch(error => {
		console.log(error);
		res.status(500).json({
			code: 500,
			message: 'Handling POST requests to /media',
			error: error
		});
	});
}

exports.get_single_media_application = (req, res, next) => {
	const id = req.params.mediaId;
	Media.findById(id)
		.exec()
		.then(doc => {
			if(doc) {
				res.status(200).json({
					code: 200,
					message: "Get the Single Media",
					doc: doc
				});
			} else {
				res.status(404).json({
					code: 404,
					message: "Not valid id"
				});
			}
			console.log(doc);
		})
		.catch(err => {
			res.status(500).json({
				code: 500,
				message: "Got an Error",
				error: err
			});
			console.log(error);
		});
}

exports.update_media_application = (req, res, next) => {
	const id = req.params.mediaId;
	Media.update({ _id: id }, { 
		$set: {
			mediaCompany: req.body.media_company,
			firstName: req.body.first_name,
			lastName: req.body.last_name,
			address: req.body.address,
			postalCode: req.body.postal_code,
			phone: req.body.phone,
			companyEmail: req.body.company_email,
			position: req.body.position,
			message: req.body.message,
			status: req.body.status,
			admin_notes: req.body.admin_notes
		} 
	})
	.exec()
	.then(result => {
		console.log(result);
		res.status(200).json({
			code: 200,
			doc: result
		});
	})
	.catch(error => {
		res.status(500).json({
			code: 500,
			error: error
		});
	});
}

exports.delete_media_application = (req, res, next) => {
	const id = req.params.mediaId;
	Media.remove({ _id: id })
	.exec()
	.then(result => {
		res.status(200).json({
			code: 200,
			message: 'Media Application Deleted',
			result: result
		});
		console.log(result);
	})
	.catch(error => {
		res.status(500).json({
			code: 500,
			message: "Some error occured",
			error: error
		});
	});
}