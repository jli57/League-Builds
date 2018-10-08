const mongoose = require('mongoose');

const SessionSchema = mongoose.Schema({
    userId : {
        type: String,
        index: true
    },
});

const Session = module.exports = mongoose.model('Session', SessionSchema);

module.exports.create = async (id) => {
    const session = new Session({userId: id});
    return await session.save();
}