const UserService = require('../services/user-service');
const SessionService = require('../services/session-service');
const HttpError = require('../../errors/HttpError');

const UserController = function () {
    let register = async (req, res) => {
        try {
            // validate username, email, password correctness

            const user = await UserService.registerUser(req.body.application);
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
                throw new HttpError(404, 'Session does not exist');

            let user = await UserService.getUserById(session.userId);
            if (!user)
                throw new HttpError(404, 'User does not exist');

            res.status(200).json({ user: UserService.removePrivate(user) });
        }
        catch (ex) {
            res.status(ex.statusCode || 500).json({ errors: ex.msg });
        }
    };

    let login = async (req, res) => {
        try {
            const user = await UserService.validatePassword(req.body.application.username, req.body.application.password);
            const session = await SessionService.createSession(user._id);

            res.status(201).json({ session: session._id });
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ error: ex.msg });
        }
    }

    let logout = async (req, res) => {
        try {
            if (!(await SessionService.deleteSession(req.params.id)))
                throw new HttpError(404, 'Session not found');

            res.status(200).json({});
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ error: ex.msg });
        }
    }

    let deleteAccount = async (req, res) => {
        try {
            const user = await UserService.validatePassword(req.body.application.username, req.body.application.password);

            if (!(await UserService.deleteUser(user._id)))
                throw new HttpError(404, 'User not found');
            if (!(await SessionService.deleteSession(req.params.id)))
                throw new HttpError(401, 'Not logged in');

            res.status(200).json({});
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ errors: ex.msg });
        }
    }

    return {
        register: register,
        login: login,
        logout: logout,
        retrieveUser: retrieveUser,
        deleteAccount: deleteAccount
    }
}();

module.exports = UserController;