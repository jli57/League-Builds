const HttpError = require('../../errors/HttpError');
const Item = require('../../models/item');
const ResourceService = require('../services/resource-service');

const ItemController = function () {

   let getAllItems = async (req, res) => {
      let {latest, result} = await ResourceService.findLatestModel(Item);

      let itemsData = {};
      result.forEach(item => {
         itemsData[item._id] = {
            id: item._id,
            name: item.name,
            image: item.versions[latest].image
         }
      });
      return res.status(200).json(itemsData);
   };

   let getItemById = async (req, res) => {
      let {latest, result} = await ResourceService.findLatestModelById(req.params.id, Champion);

      return res.status(200).json({
         [result._id]: {
            id: result._id,
            name: result.name,
            tags: result.versions[latest].tags,
            image: result.versions[latest].image,
            description: result.versions[latest].description,
            into: result.versions[latest].into,
            gold: result.versions[latest].gold,
            maps: result.versions[latest].maps
         }
      });
   };

   return {
      getAllItems: getAllItems,
      getItemById: getItemById,
   }
}();

module.exports = ItemController;