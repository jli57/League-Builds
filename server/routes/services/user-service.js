const User = require('../../models/user');
const HttpError = require('../../errors/HttpError');

const UserService = function () {
    let getUserByUsername = async (username) => {
        return await User.getUserByProperty({ username: username });
    }

    let getUserByEmail = async (email) => {
        return await User.getUserByProperty({ email: email });
    }

    let registerUser = async (application) => {
        let errors = [];
        if (await getUserByEmail(application.email))
            errors.push({ param: 'email', msg: 'Email already in use' });
        if (await getUserByUsername(application.username))
            errors.push({ param: 'username', msg: 'Username already in use' });
        if (errors.length > 0)
            throw new HttpError(406, errors);
        else
            return await User.createUser(new User({
                username: application.username,
                password: application.password,
                email: application.email,
                name: application.name
            }));
    }

    let validatePassword = async (username, password) => {
        const user = await getUserByUsername(username);
        const isMatch = await User.comparePassword(password, user.password);

        if (user && isMatch)
            return user;
        else
            throw new HttpError(401, 'Invalid username/password combination');
    }

    function validateUser(req, res) {
        getUserByUsername({ username: req.username })
            .then(user => User.comparePassword(req.password, user.password))
            .then(isMatch => {
                if (isMatch)
                    res.status(200).json({})
                else
                    res.status(400).json({ error: 'Invalid username/password combination' })
            })
            .catch(err => {
                console.log(`validateUser: ${err}`);
                res.status(500).json({ error: 'Server error' })
            });
    }

    function updateUser(req, res) {
        validatePassword(req.username, req.password)
            .then(isMatch => {
                if (isMatch)
                    getUserByUsername(req.username)
                else
                    res.status(400).json({ error: 'Incorrect password' });
            })
            .then(user => generatePassword(user))
            .then(hash => {
                user.password = hash;
                user.save();
                res.status(200).json({});
            })
            .catch(err => {
                res.status(500).json({});
            });
    };

    let removePrivate = (user) => {
        delete user._id;
        delete user.password;
        delete sessions;

        return user;
    }

    let getUserById = async (id) => {
        return await User.findById(id);
    }

    let deleteUser = async (user_id) => {
        return await User.findByIdAndDelete(user_id);
    };

    let startSession = async (user_id, session_id) => {
        const user = await User.findById(user_id);
        if(!user){
            throw new HttpError(404, 'User does not exist');
        }

        user.sessions.push({session_id: session_id});
        return await User.save(user);        
    }

    let endSession = async (user_id, session_id) => {
        const user = await User.findById(user_id);

        throw new HttpError(501, 'not implemented');
    }

    function login(req, res) { };

    function logout(req, res) { };

    return {
        getUserById: getUserById,
        getUserByUsername: getUserByUsername,
        getUserByEmail: getUserByEmail,
        validateUser: validateUser,
        registerUser: registerUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        removePrivate: removePrivate,
        validatePassword: validatePassword,
        startSession: startSession,
        endSession: endSession
    }
}();

module.exports = UserService;