const mongoose = require('mongoose');

const UserSessionSchema = mongoose.Schema({
    userId = {
        type: String,
    },
});

const UserSession = module.exports = mongoose.model('UserSchema', UserSessionSchema);

module.exports.createSession = async (id) => {
    return await { userId: id }.save();
}

module.exports.findSessionById = async (id) => {
    return await UserSession.findById(id);
};

module.exports.deleteSession = async (id) => {
    return await UserSession.deleteOne(id);
}