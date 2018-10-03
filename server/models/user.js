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
        User.generatePassword(newUser)
            .then(hash => {
                newUser.password = hash;
                newUser.save()
            })
            .then(user => resolve(user))
            .catch(err => reject(err));
    });
};

module.exports.generatePassword = (user) => {
    return new Promise((resolve, reject) => {
        bcrypt.genSalt(10, (err, salt) => {
            if (salt) {
                bcrypt.hash(user.password, salt, (err, hash) => {
                    if (err)
                        reject(err);
                    else
                        resolve(hash);
                })
            } else {
                reject(err);
            }
        })
    });
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

