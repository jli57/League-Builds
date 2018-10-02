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

module.exports.createUser = (newUser) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (salt) {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (hash) {
                        newUser.password = hash;
                        newUser.save()
                            .then(user => resolve(user))
                            .catch(err => reject(err));
                    } else {
                        reject(err);
                    }
                })
            }else{
                reject(err);
            }
        })
    });
};

module.exports.getUserById = (id) => {
    return new Promise((resolve, reject) => {
        User.findById(id, (err, user) => {
            if (user)
                resolve(user);
            else
                reject(err);
        });
    });
}

module.exports.getUserByProperty = (property) => {
    return new Promise((resolve, reject) => {
        User.findOne(property, (err, user) => {
            if (user)
                resolve(user);
            else
                reject(err);
        });
    });
};

module.exports.comparePassword = (password, hash) => {
    return new Promise((resolve, reject) => {
        bcrypt.compare(password, hash, (err, isMatch) => {
            if (isMatch)
                resolve(isMatch);
            else
                reject(err);
        })
    });
}

