const UserService = require('../services/user-service');
const SessionService = require('../services/session-service');
const MessageService = require('../services/messages-service');
const HttpError = require('../../errors/HttpError');

const UserController = function () {
	let register = async (req, res) => {
		try {			
			let errors = [];
			if (await UserService.getUserByEmail(req.body.form.email))
				errors.push({
					param: 'email',
					msg: MessageService.EMAIL_406
				});
			if (await UserService.getUserByUsername(req.body.form.username))
				errors.push({
					param: 'username',
					msg: MessageService.USERNAME_406
				});
			if (errors.length > 0)
				throw new HttpError(406, errors);
				console.log('out');
			const user = await UserService.registerUser(req.body.form);
			const session = await SessionService.createSession(user._id);

			res.status(201).json({ session: session._id });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let retrieveUser = async (req, res) => {
		try {
			const session = await SessionService.getSession(req.params.id);
			if (!session)
				throw new HttpError(404, MessageService.SESSION_404);

			let user = await UserService.getUserById(session.userId);
			if (!user)
				throw new HttpError(404, MessageService.USER_404);

			res.status(200).json({ user: UserService.removePrivate(user) });
		}
		catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let login = async (req, res) => {
		try {
			const user = await validateUser(req);
			const session = await SessionService.createSession(user._id);
			res.status(201).json({ session: session._id });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ error: ex.msg });
		}
	}

	let logout = async (req, res) => {
		try {
			if (!(await SessionService.deleteSession(req.params.id)))
				throw new HttpError(404, MessageService.SESSION_404);

			res.status(200).json({});
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ error: ex.msg });
		}
	}

	let deleteAccount = async (req, res) => {
		try {
			const user = await validateUser(req);
			if (!(await SessionService.deleteSession(req.params.id)))
				throw new HttpError(404, MessageService.SESSION_404);
			if (!(await UserService.deleteUser(user._id)))
				throw new HttpError(404, MessageService.USER_404);

			res.status(200).json({});
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	}

	let update = async (req, res) => {
		try {
			const user = await validateUser(req);
			const updatedUser = await UserService.updateUser(user, req.body.form);

			res.status(200).json({ user: UserService.removePrivate(updatedUser) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ error: ex.msg });
		}
	};

	let validate = async (req, res) => {
		try {
			await validateUser(req);
			res.status(200).json({});
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ error: ex.msg });
		}
	};

	let validateUser = async (req) => {
		const user = await UserService.getUserByUsername(req.body.form.username);
		if (!(user && (await UserService.validatePassword(user, req.body.form.password))))
			throw new HttpError(401, MessageService.LOGIN_401);
		return user;
	};

	return {
		register: register,
		login: login,
		logout: logout,
		retrieveUser: retrieveUser,
		deleteAccount: deleteAccount,
		update: update,
		validate: validate,
	}
}();

module.exports = UserController;