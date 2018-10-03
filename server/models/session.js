const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    userId : {
        type: String,
        index: true
    },
});

const Session = module.exports = mongoose.model('Session', SessionSchema);

module.exports.findSessionById = async (id) => {
    return await Session.findById(id);
};

module.exports.deleteSession = async (id) => {
    return await Session.deleteOne(id);
}

module.exports.create = async (id) => {
    const session = new Session({userId: id});
    return await session.save();
}