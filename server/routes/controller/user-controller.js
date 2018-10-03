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
            if (ex.statusCode)
                res.status(ex.statusCode).json({ errors: ex.msg });
            else {

                res.status(500).json({ errors: ex.msg });
            }
        }
    };

    let retrieveUser = async (req, res) => {
        try {
            const session = await SessionService.getSession(req.params.id);

            if (session) {
                let user = await UserService.getUserById(session.userId);
                let private = UserService.removePrivate(user)
                res.status(200).json({ user: private });
            } else {
                throw new HttpError('Session does not exist', 404);
            }
        }
        catch (ex) {
            if (ex.statusCode)
                res.status(ex.statusCode).json({ errors: ex.msg });
            else
                res.status(500).json({ errors: ex.msg });
        }
    };

    let login = async (req, res) => {
        res.status(501).json({ errors: 'not implemented' });
    }

    let logout = async (req, res) => {
        res.status(501).json({ errors: 'not implemented' });
    }

    return {
        register: register,
        login: login,
        logout: logout,
        retrieveUser: retrieveUser
    }
}();

module.exports = UserController;