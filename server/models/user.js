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
    }
});

const User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = async (newUser) => {
    newUser.password = await User.generatePassword(newUser);
    return await newUser.save();
};

module.exports.generatePassword = async (user) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(user.password, salt);    
};

module.exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if (err)
                reject(err);
            else
                resolve(user);
        });
    });
}

module.exports.getUserByProperty = (property) => {
    return new Promise((resolve, reject) => {
        User.findOne(property, (err, user) => {
            if (err)
                reject(err)
            else
                resolve(user);
        });
    });
};

module.exports.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (err)
                reject(err);
            else
                resolve(isMatch);
        })
    });
}

module.exports.deleteById = (id) => {
    return new Promise((resolve, reject) => {
        User.findByIdAndDelete(id, (err, user) => {
            if (err)
                reject(err);
            else
                resolve(user);
        })
    });
};

