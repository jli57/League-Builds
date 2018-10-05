const express = require('express');
const router = express.Router();
const UserController = require('../controller/user-controller');

router.post('/register', (req, res) => {
    UserController.register(req, res);
});

// retrieve user
router.get('/session/:id', (req, res) => {
    UserController.retrieveUser(req, res);
});

// update user
router.post("/update/:id", (req, res) => {
    res.status(501).json({error: 'unimplemented'});
});

// delete user
router.delete('/delete/:id', (req, res) => {    
    UserController.deleteAccount(req, res);
});

// confirm password
router.post("/validate/:id", (req, res) => {
    res.status(501).json({error: 'unimplemented'});
});

router.post('/login', (req, res) => {
    UserController.login(req, res);
});
        

router.delete('/logout/:id', (req, res) => {
    UserController.logout(req, res);
});

module.exports = router;