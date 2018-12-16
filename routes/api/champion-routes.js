const express = require('express');
const router = express.Router();
const ChampionController = require('../controller/champion-controller');

router.get('/all', (req, res) => {
	ChampionController.getAllChampions(req, res);	
});

router.get('/id/:id', (req, res) => {
	ChampionController.getChampionById(req, res);
});

router.get('/name/:name', (req, res) => {
	ChampionController.getChampionByName(req, res);
});

router.get('/image/id/:id', (req, res) => {
	ChampionController.getChampionImageById(req, res);
});

router.get('/image/name/:name', (req, res) => {	
	ChampionController.getChampionImageByName(req, res);
});

module.exports = router;
