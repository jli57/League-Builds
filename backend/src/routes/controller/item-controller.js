const { DDragonService, ITEM_DATA, ITEM_IMAGE } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');
const axios = require('axios');
const Item = require('../../models/item');

const ItemController = function () {
	let getAllItems = async (req, res) => {
      const items =  await Item.find({}, {name: 1, "versions.8_24_1.image": 1 } ).sort({name: 1});
      let itemsData = {};
      items.forEach( item => {
        itemsData[item._id] = {
          id: item._id,
          name: item.name,
          image: item.versions['8_24_1'].image
        }
      });
      return res.status(200).json(itemsData);
	};

	let getItemById = async (req, res) => {
      let item = await Item.findById(req.params.id);
		  return res.status(200).json({
         [item._id]: {
            id: item._id,
            name: item.name,
            patch: '8.24.1',
            tags: item.versions['8_24_1'].tags,
            image: item.versions['8_24_1'].image,
            description: item.versions['8_24_1'].description,
            into: item.versions['8_24_1'].into,
            gold: item.versions['8_24_1'].gold,
            maps: item.versions['8_24_1'].maps
         }
      });
	};

	return {
		getAllItems: getAllItems,
		getItemById: getItemById,
	}
}();

module.exports = ItemController;