const express = require('express');
const router = express.Router();
const ItemController = require('../controller/item-controller');

router.get('/all', (req, res) => {
   try {
      ItemController.getAllItems(req, res);
   } catch (ex) {
      res.status(ex.statusCode || 500).json({ errors: ex.msg });
   }
});

router.get('/:id', (req, res) => {
   try {
      ItemController.getItemById(req, res);
   } catch (ex) {
      res.status(ex.statusCode || 500).json({ errors: ex.msg });
   }
})

module.exports = router;