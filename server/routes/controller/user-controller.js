const UserService = require('../services/user-service');
const SessionService = require('../services/session-service');

const UserController = function () {
    let register = async (req, res) => {
        try {
            // validate username, email, password correctness

            const user = await UserService.registerUser(req.body.application);            
            const session = await SessionService.createSession(user._id);
                        
            res.status(201).json({ session: session._id});
        } catch (ex) {
            res.status(ex.statusCode).json({ errors: errors });
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
        logout: logout
    }
}();

module.exports = UserController;