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

    let updateUser = async (user, form) => {
        if (form.newUsername)
            user.username = form.newUsername;
        if (form.newPassword)
            user.password = await User.generatePassword(form.newPassword);
        if (form.newEmail)
            user.email = form.newEmail;
        if (form.newName)
            user.name = form.newName;

        return await User.findOneAndUpdate({ _id: user._id }, user, { new: true })
    };

    let removePrivate = (user) => {        
        return {
            username: user.username,
            email: user.email,
            name: user.name,
        };
    }

    let getUserById = async (id) => {
        return await User.findById(id);
    }

    let deleteUser = async (user_id) => {
        return await User.findByIdAndDelete(user_id);
    };        

    return {
        getUserById: getUserById,
        getUserByUsername: getUserByUsername,
        getUserByEmail: getUserByEmail,
        registerUser: registerUser,
        deleteUser: deleteUser,
        updateUser: updateUser,
        removePrivate: removePrivate,
        validatePassword: validatePassword,
    }
}();

module.exports = UserService;