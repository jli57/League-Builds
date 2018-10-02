const mongoose = require('mongoose');

const UserSessionSchema = mongoose.Schema({
    userId = {
        type: String,
    },
    time    
});

const UserSession = module.exports = mongoose.model('UserSchema', UserSessionSchema);

module.exports.CreateSession = (id, callback) => {
    let session = {userId: id};
    session.save(callback)
}

module.exports.FindSessionById = (id, callback) => {
    UserSession.findById(id, callback(err, session));
};

module.exports.DeleteSession = (id, callback) => {
    UserSession.deleteOne(id, callback(err));
}