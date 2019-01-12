const HttpError = require('../../errors/HttpError');
const Champion = require('../../models/champion');
const Resource = require('../../models/resource');

const ChampionController = function () {

   let latestVersion = async (req, res) => {
      return (await Resource.findOne({})).versions[0].replace(/\./g, '_');
   }

   let getAllChampions = async (req, res) => {
      let latest = (await latestVersion())
      const champions = await Champion.find({[`versions.${latest}`]: {$exists: true}}, {name: 1, image: 1}).sort({ name: 1 });

      let championsData = {};
      champions.forEach( champion => {
        championsData[champion._id] = {
          id: champion._id,
          name: champion.name,
          image: champion.image
        }
      });
      return res.status(200).json(championsData);
   };

   let getChampionById = async (req, res) => {
      let latest = (await latestVersion())
      let champion = await Champion.findOne({_id: req.params.id, [`versions.${latest}`]: {$exists: true}});


      return res.status(200).json({
         [champion._id]: {
            id: champion._id,
            name: champion.name,
            title: champion.title,
            image: champion.image,
            tags: champion.tags,
            stats: champion.versions[latest].stats,
            spells: champion.versions[latest].spells,
            passive: champion.versions[latest].passive,
         }
      });
   };

   return {
      getAllChampions: getAllChampions,
      getChampionById: getChampionById,
   }
}();

module.exports = ChampionController;