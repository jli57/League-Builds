const express = require('express');
const router = express.Router();
const ResourceController = require('../controller/resource-controller');

router.put('/champion/:version', (req, res) => {
	console.log('in');
	ResourceController.insertChampions(req, res);
});

module.exports = router;