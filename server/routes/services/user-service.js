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
        return await User.createUser(new User({
            username: application.username,
            password: application.password,
            email: application.email,
            name: application.name
        }));
    }

    let validatePassword = async (user, password) => {
        return await User.comparePassword(password, user.password);
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