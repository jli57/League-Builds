const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const UserService = require('../services/user-service');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserController = require('../controller/user-controller');

router.post('/register', (req, res) => {
    UserController.register(req, res);
});

// retrieve user
router.get('/:id', (req, res) => {
    UserController.retrieveUser(req, res);
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

router.post('/login', (req, res) => {
    UserController.login(req, res);
});
        

router.get('/logout', (req, res) => {
    UserController.login(req, res);
});

module.exports = router;