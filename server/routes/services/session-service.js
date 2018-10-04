const Session = require('../../models/session');
const HttpError = require('../../errors/HttpError');

const SessionService = function () {
    const getSession = async (id) => {
        try {
            return await Session.findById(id);
        } catch (er) {
            throw new HttpError(501, 'Session does not exist?');
        }
    };

    const deleteSession = async (session_id) => {
        return await Session.findByIdAndDelete(session_id);
    }

    const createSession = async (userId) => {
        return await Session.create(userId);        
    }

    return {
        getSession: getSession,
        deleteSession: deleteSession,
        createSession: createSession
    }
}();

module.exports = SessionService;