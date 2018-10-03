const Session = require('../../models/session');
const HttpError = require('../../errors/HttpError') ;

const SessionService = function () {
    const getSession = async (id) => {
        throw new URIError('Not implemented');
    };

    const deleteSession = async (id) => {
        throw new URIError('Not implemented');
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