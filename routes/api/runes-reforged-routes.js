const express = require('express');
const router = express.Router();
const RunesReforgedController = require('../controller/runes-reforged-controller');

// http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/runesReforged.json

router.get('/:id', (req, res) => {
	RunesReforgedController.getRunesReforgedById(req, res);
});

router.get('/:id/image', (req, res) => {
	RunesReforgedController.getRunesReforgedImageById(req, res);
});

module.exports = router;