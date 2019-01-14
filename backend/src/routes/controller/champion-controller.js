const HttpError = require('../../errors/HttpError');
const Champion = require('../../models/champion');
const ResourceService = require('../services/resource-service');

const ChampionController = function () {

   let getAllChampions = async (req, res) => {
      let {latest, result} = await ResourceService.findLatestModel(Champion);

      let championsData = {};
      result.forEach( champion => {
        championsData[champion._id] = {
          id: champion._id,
          name: champion.name,
          image: champion.image
        }
      });
      return res.status(200).json(championsData);
   };

   let getChampionById = async (req, res) => {
      let {latest, result} = await ResourceService.findLatestModelById(req.params.id, Champion);

      return res.status(200).json({
         [result._id]: {
            id: result._id,
            name: result.name,
            title: result.title,
            image: result.image,
            tags: result.tags,
            stats: result.versions[latest].stats,
            spells: result.versions[latest].spells,
            passive: result.versions[latest].passive,
         }
      });
   };

   return {
      getAllChampions: getAllChampions,
      getChampionById: getChampionById,
   }
}();

module.exports = ChampionController;