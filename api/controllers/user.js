const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

exports.get_all_users = (req, res, next) => {
	User.find()
	.select('_id name email')
	.exec()
	.then(users => {
		res.status(200).json({
			code: 200,
			users: users
		});
	})
	.catch(error => {
		res.status(500).json({
			code: 500,
			error: error
		});
	});
}

exports.login = (req, res, next) => {
	User.find({email: req.body.email})
	.exec()
	.then(user => {
		if(user.length < 1) {
			return res.status(401).json({
				message: 'Auth Failed'
			});
		}
		bcrypt.compare(req.body.password, user[0].password, (err, response) => {
			if(err) {
				return res.status(401).json({
					message: 'Auth Failed'
				});
			}
			if (response) {
				const token = jwt.sign({
					email: user[0].email,
					userId: user[0]._id
				}, 'secret', {
					expiresIn: "1d"
				});
				return res.status(200).json({
					message: 'Auth Successful',
					token: token
				});
			}
			return res.status(401).json({
				message: 'Auth Failed'
			});
		});
	})
	.catch(err => {
		console.log(err)
		res.status(500).json({
			error: err
		});
	});
}

exports.signup = (req, res, next) => {
	bcrypt.hash(req.body.password, 10, (err, hash) => {
		if (err) {
			return res.status(500).json({
				error: err
			});
		} else {
			const user = new User({
				_id: new mongoose.Types.ObjectId(),
				name: req.body.name,
				email: req.body.email,
				password: hash
			});
			user.save()
			.then(result => {
				res.status(201).json({
					code: 200,
					message: "User Created Successfully"
				});
			})
			.catch(error => {
				res.status(500).json({
					code: 500,
					error: error
				});
			});
		}
	});
}