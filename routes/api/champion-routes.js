const express = require('express');
const router = express.Router();

// latest patch versions can be found here https://ddragon.leagueoflegends.com/api/versions.json
// api can be found here http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion.json

router.get('/:id', (req, res) => {
	throw new Error('unimplemented');
});

router.get('/all', (req, res) => {
	throw new Error('unimplemented');
});

router.get('/:id/image', (req, res) => {
	throw new Error('unimplemented');
});

router.get('/:id/stats', (req, res) => {
	throw new Error('unimplemented');
});

