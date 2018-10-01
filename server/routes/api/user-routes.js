const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

router.post('/register', (req, res) => {
    const name = req.body.name;
    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    req.checkBody('name', 'Name is required').notEmpty();
    req.checkBody('email', 'Email is required').notEmpty();
    req.checkbody('email', 'Email is not valid').isEmail();
    req.checkBody('username', 'Name is required').notEmpty();
    req.checkBody('password', 'Name is required').notEmpty();
    req.checkBody('password2', 'Passwords do not match').equals(password);

    if (req.validationErrors()) {
        res.status(400).json({ errors: req.validationErrors() });
    } else {
        User.findOne({
            email: email
        }, (err1, user1) => {
            let err = { errors: [] };
            if (user1) {
                err.errors.push({
                    param: "email",
                    msg: "Email is already in use"
                });
            }
            if (user2) {
                err.errors.push({
                    param: "username",
                    msg: "Username is already in use"
                });
            }

            if (err.errors.length > 0) {
                res.status(400).json(err);
            } else {
                User.createUser(new User({
                    name: name,
                    email: email,
                    username: username,
                    password: password
                }), (err) => {
                    if (err) {
                        res.status(400).json({ errors: err });
                    } else {
                        res.status(200).json({});
                    }
                })
            }
        })
    }
});

// retrieve user
router.get('/:id', function (req, res) {
    GetUser(req.params.id, res, (user) => {
        res.status(200).json({ user });
    })
});

// update user
router.post("/update/:id", function (req, res) {
    GetUser(req.params.id, res, (user) => {
        req.checkBody('email', 'Email  is required').notEmpty();
        req.checkBody('email', 'Email is not valid').isEmail();
        req.checkBody('password', 'Name is required').notEmpty();
        req.checkBody('password2', 'Passwords do not match').equals(req.body.password);

        let err = req.validationErrors();
        if (err) {
            res.status(400).json(err);
        } else {
            user.email = req.body.email;
            user.name = req.body.name;
            User.generatePassword(req.body.password, function (err, hash) {
                if (hash) {
                    user.password = hash;
                    user.save(function (err, callback) {
                        if (callback) {
                            res.status(200).json({});
                        } else {
                            res.status(500).json({
                                error: "Password couldn't be updated"
                            });
                        }
                    })
                } else {
                    res.status(500).json({
                        error: "Password couldn't be updated"
                    });
                }
            });
        }
    });
});

// delete user
router.delete('/:id', function (req, res) {
    User.findByIdAndDelete(req.params.id, function (err, user) {
        if (user) {
            res.status(200).json({});
        } else {
            res.status(400).json(badJson);
        }
    });
});

// confirm password
router.post("/validate/:id", function (req, res) {
    console.log(req.body);
    if (!req.body.password) {
        res.status(406).json({ msg: "please enter a password" });
    } else {
        GetUser(req.params.id, res, (user) => {
            User.comparePassword(req.body.password, user.password, (err, isMatch) => {
                if (isMatch) {
                    res.status(200).json({});
                } else {
                    res.status(406).json({ msg: "incorrect password" });
                }
            })
        })
    }
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
            }else{
                res.status(400).json({ msg: "Invalid login" });
            }
        });
    }));

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/users/login');
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