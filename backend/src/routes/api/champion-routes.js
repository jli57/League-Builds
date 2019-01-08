const express = require('express');
const router = express.Router();
const ChampionController = require('../controller/champion-controller');
const HttpError = require('../../errors/HttpError');

router.get('/all', (req, res) => {
   try {
      ChampionController.getAllChampions(req, res);
   } catch (ex) {
      res.status(ex.statusCode || 500).json({ errors: ex.msg });
   }
});

router.get('/:id', (req, res) => {
   try{
      ChampionController.getChampionById(req, res);
   }catch(ex){
      res.status(ex.statusCode || 500).json({ errors: ex.msg });
   }
});

module.exports = router;
