const Session = require('../../models/session');
const HttpError = require('../../errors/HttpError');

const SessionService = function () {
    const getSession = async (id) => {
        try {
            return await Session.findSessionById(id);
        } catch (er) {
            throw new HttpError('Session does not exist?', 501);
        }
    };

    const deleteSession = async (session_id) => {
        return await Session.findByIdAndDelete(session_id);
    }

    const createSession = async (userId) => {
        try {
            return await Session.create(userId);
        } catch (err) {
            throw new HttpError(err.msg, 500)
        }
    }

    return {
        getSession: getSession,
        deleteSession: deleteSession,
        createSession: createSession
    }
}();

module.exports = SessionService;