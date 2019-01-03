const express = require('express');
const router = express.Router();
const BuildController = require('../controller/build-controller');

// get all existing builds for the user
router.get('/:session', (req, res) => {
	BuildController.findAllBuilds(req, res);
});

// gets build by id
router.get('/:session/:build', (req, res) => {
	throw new Error('unimplemented');
})

// create a new build
router.post('/:session', (req, res) => {	
	BuildController.createNewBuild(req, res);
});

// updates a build 
router.put('/:session/:build', (req, res) => {
	BuildController.saveBuild(req, res);
});

// deletes a specific build
router.delete('/:session/:build', (req, res) => {
	throw new Error('unimplemented');
});

// deletes every build a user has
router.delete('/:session', (req, res) => {
	throw new Error('unimplemented');
});

module.exports = router;
