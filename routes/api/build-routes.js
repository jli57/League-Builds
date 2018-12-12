const express = require('express');
const router = express.Router();

// retrieve the build
router.get('/:id', (req, res) => {
	throw new Error('unimplemented');
});


// crud items
router.get('/:id/item/:slot', (req, res) => {
	throw new Error('unimplemented');
});

router.delete('/:id/remove/:slot', (req, res) => {
	throw new Error('unimplemented');
})

router.delete('/clear/:id/', (req, res) => {
	throw new Error('unimplemented');
});

router.delete('/dispose/:id', (req, res) => {
	throw new Error('unimplemented');
})

router.post('/:id/add/item/:itemId', (req, res) => {
	throw new Error('unimplemented');
});

// crud champion
router.post('/:id/level/:level', (req, res) => {
	throw new Error('unimplemented');
})

router.post('/:id/add/champion/:champId', (req, res) => {
	throw new Error('unimplemented');
})

router.delete('/:id/remove/champion/:champId', (req, res) => {
	throw new Error('unimplemeted');
});

// crud runes reforged
