const { DDragonService, RUNESREFORGED_DATA, RUNESREFORGED_IMAGE } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');
const axios = require('axios');

const RunesReforgedController = function () {
	let exists = (obj, res) => {
		if (obj)
			res.status(200).json(obj);
		else
			throw new HttpError(404, 'RunesReforged does not exist');
	};

	let runesAPI = async (req, res) => {
		try {
			let runes = await axios.get(`${DDragonService.getPath(RUNESREFORGED_DATA)}`);

			return runes.data;
		} catch (ex) {
			throw new HttpError(404, 'DDragon is down');
		}
	};

	let runesIdAPI = async (req, res) => {
		let runes = await runesAPI(req, res);
		for (var tree in runes) {
			if (runes[tree].id == req.params.id) {
				return runes[tree];
			} else {
				for (var slot in runes[tree]['slots']) {
					for (var rune in runes[tree]['slots'][slot]['runes']) {
						if (runes[tree]['slots'][slot]['runes'][rune].id == req.params.id) {
							return runes[tree]['slots'][slot]['runes'][rune];
						}
					}
				}
			}
		}

		throw new HttpError(404, 'RunesReforged does not exist');
	}

	let runesNameAPI = async (req, res) => {
		return exists(await runesAPI(req, res));
	}

	let getAllRunesReforgeds = async (req, res) => {
		try {
			res.status(200).json(await runesAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getRunesReforgedById = async (req, res) => {
		try {
			return exists(await runesIdAPI(req, res), res);
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getRunesReforgedByName = async (req, res) => {
		try {
			return exists(await runesNameAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getRunesReforgedImage = (runes) => {
		return `${DDragonService.getPath(RUNESREFORGED_IMAGE)}/${runes.image.full}`;
	}

	let getRunesReforgedImageById = async (req, res) => {
		try {
			res.status(200).json({ src: getRunesReforgedImage(await runesIdAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getRunesReforgedImageByName = async (req, res) => {
		try {
			res.status(200).json({ src: getRunesReforgedImage(await runesNameAPI(req, res)) });
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	}

	return {
		getAllRunesReforgeds: getAllRunesReforgeds,
		getRunesReforgedById: getRunesReforgedById,
		getRunesReforgedByName: getRunesReforgedByName,
		getRunesReforgedImageById: getRunesReforgedImageById,
		getRunesReforgedImageByName: getRunesReforgedImageByName
	}
}();

module.exports = RunesReforgedController;