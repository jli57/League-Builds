const Session = require('../../models/session');

const SessionService = function () {
    const getSession = async (id) => {
        return await Session.findById(id);
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