const { DDragonService, CHAMPION_DATA, CHAMPION_IMAGE } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');
const axios = require('axios');

const RiotController = function () {
	let exists = (obj) => {
		if (obj)
			return obj;
		else
			throw new HttpError(404, 'Champion does not exist');
	};

	let championAPI = async (req, res) => {
		try {
			let champions = await axios.get(`${DDragonService.getPath(CHAMPION_DATA)}`);

			return champions.data.data;
		} catch (ex) {
			throw new HttpError(404, 'DDragon is down');
		}
	};

	let championIdAPI = async (req, res) => {
		let champions = await championAPI(req, res);

		for (var champion in champions)
			if (champions[champion].key === req.params.id)
				return champions[champion];

		throw new HttpError(404, 'Champion does not exist');
	}

	let championNameAPI = async (req, res) => {
		return exists(await championAPI(req, res));
	}

	let getAllChampions = async (req, res) => {
		try {
			res.status(200).json(await championAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionById = async (req, res) => {
		try {
			return exists(await championIdAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionByName = async (req, res) => {
		try {
			return exists(await championNameAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionImage = (champion) => {
		return `${DDragonService.getPath(CHAMPION_IMAGE)}/${champion.image.full}`;
	}

	let getChampionImageById = async (req, res) => {
		try {
			res.status(200).json({ src: getChampionImage(await championIdAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionImageByName = async (req, res) => {
		try {
			res.status(200).json({ src: getChampionImage(await championNameAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	}

	return {
		getAllChampions: getAllChampions,
		getChampionById: getChampionById,
		getChampionByName: getChampionByName,
		getChampionImageById: getChampionImageById,
		getChampionImageByName: getChampionImageByName
	}
}();

module.exports = RiotController;