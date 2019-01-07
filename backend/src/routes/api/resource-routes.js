const express = require('express');
const router = express.Router();
const ResourceController = require('../controller/resource-controller');

router.put('/champion/:version', (req, res) => {
	ResourceController.insertChampions(req, res);
});

module.exports = router;