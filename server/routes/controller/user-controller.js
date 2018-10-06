const UserService = require('../services/user-service');
const SessionService = require('../services/session-service');
const HttpError = require('../../errors/HttpError');

const UserController = function () {
    let register = async (req, res) => {
        try {
            let errors = [];
            if (await UserService.getUserByEmail(req.body.application.email))
                errors.push({ param: 'email', msg: 'Email already in use' });
            if (await UserService.getUserByUsername(req.body.application.username))
                errors.push({ param: 'username', msg: 'Username already in use' });
            if (errors.length > 0)
                throw new HttpError(406, errors);

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
                throw new HttpError(404, 'Session not found');

            res.status(200).json({});
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ error: ex.msg });
        }
    }

    let deleteAccount = async (req, res) => {
        try {
            const user = await validateUser(req);
            if (!(await SessionService.deleteSession(req.params.id)))
                throw new HttpError(401, 'Not logged in');
            if (!(await UserService.deleteUser(user._id)))
                throw new HttpError(404, 'User not found');

            res.status(200).json({});
        } catch (ex) {
            res.status(ex.statusCode || 500).json({ errors: ex.msg });
        }
    }

    let update = async (req, res) => {
        try {
            const user = await validateUser(req);
            const updatedUser = await UserService.updateUser(user, req.body.application);
            
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
        const user = await UserService.getUserByUsername(req.body.application.username);
        if (!(user && (await UserService.validatePassword(user, req.body.application.password))))
            throw new HttpError(401, 'Invalid username/password combination');
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