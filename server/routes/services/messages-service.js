const MessageService = () => () => {
    return {
        EMAIL_406: 'Email is already in use',
        USERNAME_406: 'Username is already in use',
        SESSION_404: 'You are not logged in',
        USER_404: 'This user does not exist',
        LOGIN_401: 'Invalid username/password'
    };
};

module.exports = MessageService;