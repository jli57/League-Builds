const express = require('express');
const router = express.Router();
const ChampionController = require('../controller/champion-controller');

router.get('/all', (req, res) => {
	ChampionController.getAllChampions(req, res);
});

router.get('/:noun', (req, res) => {
	console.log('entered');
	if (isNaN(req.params.noun))
		ChampionController.getChampionByName(req, res);
	else
		ChampionController.getChampionById(req, res);
});

router.get('/:noun/image', (req, res) => {
	if (isNaN(req.params.noun))
		ChampionController.getChampionImageByName(req, res);
	else
		ChampionController.getChampionImageById(req, res);
})

module.exports = router;
