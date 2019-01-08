const { DDragonService, CHAMPION_DATA, SPELL_IMAGE, CHAMPION_IMAGE, ALL_CHAMPIONS } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');
const axios = require('axios');
const Champion = require('../../models/champion');

const ChampionController = function () {

   let getAllChampions = async (req, res) => {
      return res.status(200).json(await Champion.find({}, { versions: 0 }));
   };

   let getChampionById = async (req, res) => {
      let champion = await Champion.findById(req.params.id);

      return res.status(200).json({
         [champion._id]: {
            id: champion._id,
            name: champion.name,
            title: champion.title,
            image: champion.image,
            tags: champion.tags,
            patch: '8.24.1',
            stats: champion.versions['8_24_1'].stats,
            spells: champion.versions['8_24_1'].spells,
            passive: champion.versions['8_24_1'].passive,
         }
      });
   };

   return {
      getAllChampions: getAllChampions,
      getChampionById: getChampionById,
   }
}();

module.exports = ChampionController;