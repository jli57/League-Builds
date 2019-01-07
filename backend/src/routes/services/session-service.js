const Session = require('../../models/session');
const User = require('../../models/user');

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

	const getUserBuilds = async (sessionId) => {
		let session = await Session.findById(sessionId);
		return await User.findById(session.userId, {
			builds: 1,
			username: 1,
			_id: 0
		});
	};

	return {
		getSession: getSession,
		deleteSession: deleteSession,
		createSession: createSession,
		getUserBuilds: getUserBuilds
	}
}();

module.exports = SessionService;