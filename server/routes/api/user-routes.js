const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const UserService = require('../services/user-service');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.post('/register', (req, res) => {
    UserService.registerUser(req, res);
});

// retrieve user
router.get('/:id', (req, res) => {
    UserService.getUserById(req, res);
});

// update user
router.post("/update/:id", (req, res) => {
    updateUser(req, res);
});

// delete user
router.delete('/:id', (req, res) => {
    UserService.deleteUser(req, res);
});

// confirm password
router.post("/validate/:id", (req, res) => {
    UserService.validateUser(req, res);
});

passport.use(new LocalStrategy((username, password, done) => {
    User.getUserByUsername(username, function (err, user) {
        if (err)
            throw err;
        if (!user)
            return done(null, false, { message: 'Unknown User' });

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err)
                throw err;
            if (isMatch)
                return done(null, user);
            else
                return done(null, false, { message: 'Invalid password' });
        })
    })
}))

passport.serializeUser((user, done) => {
    done(null, user.id);
})

passport.deserializeUser((id, done) => {
    User.getUserById(id)
});

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login'
    }, (req, res) => {
        User.getUserByUsername(req.body.username, (err, user) => {
            if (user) {
                UserSession.GetSessionById(user._id, (err, session) => {
                    if (session) {
                        res.status(200).json({ sessionId: session._id });
                    } else {
                        UserSession.CreateSession(new UserSession({ userId: user._id }), (err, newSessionId) => {
                            if (err) {
                                res.status(500).json({ err });
                            } else {
                                res.status(200).json({ sessionId: newSessionId });
                            }
                        })
                    }
                });
            } else {
                res.status(400).json({ msg: "Invalid login" });
            }
        });
    }));

router.get('/logout', (req, res) => {
    const sessionId = req.body.sessionId;
    if (sessionId) {
        UserSession.DeleteSession(sessionId, (err) => {
            if (err) {
                res.status(500).json({ msg: "internal server error" });
            }
        });
        req.logout();
    }
    res.status(200).json({});
});

let GetUser = (id, res, callback) => {
    User.findById(id, function (err, user) {
        if (user) {
            callback(user);
        } else {
            res.status(400).json({ msg: "User with that id does not exist" });
        }
    });
};


module.exports = router;