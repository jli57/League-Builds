const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = mongoose.Schema({
	username: {
		type: String,
		index: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	builds: [{
		id: {
			type: String
		}
	}]
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = async (newUser) => {
	newUser.password = await User.generatePassword(newUser.password);
	return await newUser.save();
};

module.exports.generatePassword = async (password) => {
	const salt = await bcrypt.genSalt(10);
	return await bcrypt.hash(password, salt);
};

module.exports.getUserByProperty = async (property) => {
	return await User.findOne(property);
};

module.exports.comparePassword = async (password, hash) => {
	return await bcrypt.compare(password, hash);
}