const express = require('express');
const router = express.Router();
const ResourceController = require('../controller/resource-controller');

router.put('/champion/:version', (req, res) => {
   try {
      ResourceController.insertChampions(req, res);
   } catch (ex) {
      res.status(ex.statusCode || 500, ex.msg);
   }
});

router.put('/item/:version', (req, res) => {
   try {
      ResourceController.insertItems(req, res);
   } catch (ex) {
      res.status(ex.statusCode || 500, ex.msg);
   }
});

module.exports = router;