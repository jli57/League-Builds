const User = require('../../models/user');
const HttpError = require('../../errors/HttpError') ;

const UserService = function () {
    async function getUserByUsername(username) {
        return await User.getUserByProperty(username);
    }

    async function getUserByEmail(email) {
        return await User.getUserByProperty(email);
    }

    async function registerUser(application) {
        //try {
            const email = await getUserByEmail({ email: application.email });
            const username = await getUserByUsername({ username: application.username });

            let errors = [];
            if (email)
                errors.push({ param: 'email', msg: 'Email already in use' });
            if (username)
                errors.push({ param: 'username', msg: 'Username already in use' });
            if (errors.length > 0) {
                throw new HttpError(errors, 406);
            }
            else {
                return await User.createUser(new User({
                    username: application.username,
                    password: application.password,
                    email: application.email,
                    name: application.name
                }));
            }
        // } catch (ex) {
        //     console.log(ex);
        //     throw new HttpError(ex.msg, ex.statusCode);
        // }
    }

    function validatePassword(username, password) {
        getUserByUsername(username)
            .then(user => User.comparePassword(password, user.password))
            .then(isMatch => { return isMatch })
            .catch(err => {
                console.log(`validatePassword: ${err}`);
                throw err;
            });
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
                console.log(`updateUser: ${err}`);
                res.status(500).json({});
            });
    };

    function getUserById(req, res) {
        User.getUserById(req.params.id)
            .then(user => {
                if (user)
                    res.status(200).json(user)
                else
                    res.status(400).json({ error: 'User not found' })
            })
            .catch(err => {
                console.log(`deleteUser: ${err}`)
                res.status(500).json({})
            })
    }

    function deleteUser(req, res) {
        User.deleteById(req.params.id)
            .then(user => {
                if (user)
                    res.status(200).json({})
                else
                    res.status(400).json({ error: 'User not found' })
            })
            .catch(err => {
                console.log(`deleteUser: ${err}`)
                res.status(500).json({})
            })
    };

    function login(req, res) { };

    function logout(req, res) { };

    return {
        getUserById: getUserById,
        getUserByUsername: getUserByUsername,
        getUserByEmail: getUserByEmail,
        validateUser: validateUser,
        registerUser: registerUser,
        deleteUser: deleteUser,
        updateUser: updateUser
    }
}();

module.exports = UserService;