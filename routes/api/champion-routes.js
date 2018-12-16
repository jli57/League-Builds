const express = require('express');
const router = express.Router();
const RiotController = require('../controller/riot-controller');

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
	RiotController.getChampionImageByName(req, res);
});

module.exports = router;
