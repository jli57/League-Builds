const express = require('express');
const router = express.Router();
const RunesReforgedController = require('../controller/runes-reforged-controller');

router.get('/', (req, res) => {
	RunesReforgedController.getAllRunes(req, res);
})

router.get('/tree/:id', (req, res) => {
	res.status(404).json({error: 'unimplemented'});
});

router.get('/:id', (req, res) => {
	RunesReforgedController.getRunesReforgedById(req, res);
});

router.get('/:id/image', (req, res) => {
	RunesReforgedController.getRunesReforgedImageById(req, res);
});

module.exports = router;