const express = require('express');
const router = express.Router();
const RiotController = require('../controller/riot-controller');

// latest patch versions can be found here https://ddragon.leagueoflegends.com/api/versions.json
// api can be found here http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion.json

router.get('/all', (req, res) => {
	RiotController.getAllChampions(req, res);	
});

router.get('/id/:id', (req, res) => {
	RiotController.getChampionById(req, res);
});

router.get('/name/:name', (req, res) => {
	RiotController.getChampionByName(req, res);
});

router.get('/image/id/:id', (req, res) => {
	RiotController.getChampionImageById(req, res);
});

router.get('/image/name/:name', (req, res) => {
	console.log('in');
	RiotController.getChampionImageByName(req, res);
});

router.get('/:id/stats', (req, res) => {
	throw new Error('unimplemented');
});


module.exports = router;
