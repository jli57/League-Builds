const express = require('express');
const router = express.Router();
const VersionController = require('../controller/version-controller');

// https://ddragon.leagueoflegends.com/api/versions.json
router.get('/', (req, res) => {
	VersionController.getLatestVersion(req, res);
});

router.get('/all', (req, res) => {
	VersionController.getAllVersions(req, res);
});

router.get('/:key', (req, res) => {
	VersionController.getVersion(req, res);
});

module.exports = router;