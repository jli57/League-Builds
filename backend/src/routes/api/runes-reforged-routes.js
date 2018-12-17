const express = require('express');
const router = express.Router();
const RunesReforgedController = require('../controller/runes-reforged-controller');

router.get('/:id', (req, res) => {
	RunesReforgedController.getRunesReforgedById(req, res);
});

router.get('/:id/image', (req, res) => {
	RunesReforgedController.getRunesReforgedImageById(req, res);
});

module.exports = router;