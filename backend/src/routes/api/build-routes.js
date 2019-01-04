const express = require('express');
const router = express.Router();
const BuildController = require('../controller/build-controller');

// get all existing builds for the user
router.get('/session/:session', (req, res) => {
	BuildController.findAllBuilds(req, res);
});

// gets build by id
router.get('/:build', (req, res) => {
	BuildController.getBuild(req, res);
})

// create a new build
router.post('/save/:session', (req, res) => {	
	BuildController.createNewBuild(req, res);
});

// updates a build 
router.put('/:session/:build', (req, res) => {
	BuildController.saveBuild(req, res);
});

// deletes a specific build
router.delete('/:session/:build', (req, res) => {
	BuildController.deleteBuild(req, res);
});

// deletes every build a user has
router.delete('/:session', (req, res) => {
	BuildController.deleteAll(req, res);
});

module.exports = router;
