const Session = require('../../models/session');

const SessionService = function () {
    const getSession = async (id) => {
        throw new URIError('Not implemented');
    };

    const deleteSession = async (id) => {
        throw new URIError('Not implemented');
    }

    const createSession = async (user_id) => {
        throw new URIError('Not implemented');
    }

    return {
        getSession: getSession,
        deleteSession: deleteSession,
        createSession: createSession
    }
}();

modules.export = SessionService;