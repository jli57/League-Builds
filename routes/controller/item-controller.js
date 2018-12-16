const { DDragonService, ITEM_DATA, ITEM_IMAGE } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');
const axios = require('axios');

const ItemController = function () {
	let exists = (obj, res) => {		
		if (obj)
			res.status(200).json(obj);
		else
			throw new HttpError(404, 'Item does not exist');
	};

	let itemAPI = async (req, res) => {
		try {
			let items = await axios.get(`${DDragonService.getPath(ITEM_DATA)}`);

			return items.data.data;
		} catch (ex) {
			throw new HttpError(404, 'DDragon is down');
		}
	};

	let itemIdAPI = async (req, res) => {
		let items = await itemAPI(req, res);		
		return items[req.params.id];
	}

	let itemNameAPI = async (req, res) => {
		return exists(await itemAPI(req, res));
	}

	let getAllItems = async (req, res) => {
		try {
			res.status(200).json(await itemAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getItemById = async (req, res) => {
		try {
			return exists(await itemIdAPI(req, res), res);
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getItemByName = async (req, res) => {
		try {
			return exists(await itemNameAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getItemImage = (item) => {
		return `${DDragonService.getPath(ITEM_IMAGE)}/${item.image.full}`;
	}

	let getItemImageById = async (req, res) => {
		try {
			res.status(200).json({ src: getItemImage(await itemIdAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getItemImageByName = async (req, res) => {
		try {
			res.status(200).json({ src: getItemImage(await itemNameAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	}

	return {
		getAllItems: getAllItems,
		getItemById: getItemById,
		getItemByName: getItemByName,
		getItemImageById: getItemImageById,
		getItemImageByName: getItemImageByName
	}
}();

module.exports = ItemController;