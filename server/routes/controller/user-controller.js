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
            if (!session) {
                throw new HttpError(404, 'Session does not exist');
            }

            let user = await UserService.getUserById(session.userId);
            if (!user) {
                throw new HttpError(404, 'User does not exist');
            }

            let private = UserService.removePrivate(user)
            res.status(200).json({ user: private });
        }
        catch (ex) {
            res.status(ex.statusCode || 500).json({ errors: ex.msg });
        }
    };

    let login = async (req, res) => {
        res.status(501).json({ errors: 'not implemented' });
    }

    let logout = async (req, res) => {
        res.status(501).json({ errors: 'not implemented' });
    }

    let deleteAccount = async (req, res) => {
        try {
            const user = await UserService.validatePassword(req.body.application.username, req.body.application.password);
            
            let deletedUser = await UserService.deleteUser(user._id);
            if (!deletedUser) {
                throw new HttpError('User not found', 404);
            }

            let deletedSession = await SessionService.deleteSession(req.params.id);
            if (!deletedSession) {
                throw new HttpError('Not logged in', 401);
            }

            res.status(204).json({});
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