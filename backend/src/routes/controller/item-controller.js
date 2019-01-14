const HttpError = require('../../errors/HttpError');
const Item = require('../../models/item');
const Resource = require('../../models/resource');

const ItemController = function () {
   let latestVersion = async (req, res) => {
      return (await Resource.findOne({})).versions[0].replace(/\./g, '_');
   }

   let getAllItems = async (req, res) => {
      let latest = (await latestVersion())
      const items = await Item.find({ [`versions.${latest}`]: { $exists: true } }, { name: 1, "versions.8_24_1.image": 1 }).sort({ name: 1 });

      let itemsData = {};
      items.forEach(item => {
         itemsData[item._id] = {
            id: item._id,
            name: item.name,
            image: item.versions['8_24_1'].image
         }
      });
      return res.status(200).json(itemsData);
   };

   let getItemById = async (req, res) => {
      let latest = (await latestVersion())
      let item = await Item.findById({ _id: req.params.id, [`versions.${latest}`]: { $exists: true } });

      return res.status(200).json({
         [item._id]: {
            id: item._id,
            name: item.name,
            tags: item.versions[latest].tags,
            image: item.versions[latest].image,
            description: item.versions[latest].description,
            into: item.versions[latest].into,
            gold: item.versions[latest].gold,
            maps: item.versions[latest].maps
         }
      });
   };

   return {
      getAllItems: getAllItems,
      getItemById: getItemById,
   }
}();

module.exports = ItemController;