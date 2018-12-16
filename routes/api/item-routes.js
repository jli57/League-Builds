const express = require('express');
const router = express.Router();
const ItemController = require('../controller/item-controller');

router.get('/all', (req, res) => {
	ItemController.getAllItems(req, res);
});

router.get('/:id', (req, res) => {
	ItemController.getItemById(req, res);
})

router.get('/:id/image', (req, res) => {
	ItemController.getItemImageById(req, res);
});

module.exports = router;