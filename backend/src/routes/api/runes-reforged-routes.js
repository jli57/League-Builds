const express = require('express');
const router = express.Router();
const RunesReforgedController = require('../controller/runes-reforged-controller');

router.get('/', (req, res) => {
	RunesReforgedController.getAllRunes(req, res);
})

router.get('/tree/:noun', (req, res) => {
	if (isNaN(req.params.noun))
		res.status(404).json({ error: 'unimplemented' });
	else
	RunesReforgedController.getRunesReforgedTreeById(req,res);
});

router.get('/:id', (req, res) => {
	RunesReforgedController.getRunesReforgedById(req, res);
});

router.get('/:id/image', (req, res) => {
	RunesReforgedController.getRunesReforgedImageById(req, res);
});

module.exports = router;