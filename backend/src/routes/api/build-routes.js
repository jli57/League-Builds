const express = require('express');
const router = express.Router();

// get all existing builds for the user
router.get('/:session', (req, res) => {
	throw new Error('unimplemented');
});

// gets build id
router.get('/:session/:build', (req, res) => {
	throw new Error('unimplemented');
})

// create a new build
router.post('/:session', (req, res) => {
	throw new Error('unimplemented');
});

// updates a build 
router.put('/:session/:build', (req ,res) => {
	throw new Error('unimplemented');
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
