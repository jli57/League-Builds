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

	let runesAPI = async () => {
		let runes = await axios.get(`${DDragonService.getPath(RUNESREFORGED_DATA)}`);

		if (runes)
			return runes.data;
		else
			throw new HttpError(404, 'DDragon is down');
	};

	let getAllRunes = async (req, res) => {
		try {
			return res.status(200).json(await runesAPI());
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg })
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
			res.status(200).json(await runesIdAPI(req, res));
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

	let getRunesReforgedTreeById = async (req, res) => {
		try {
			console.log(req.params.noun);
			req.params.id = req.params.noun;
			switch (req.params.noun) {
				case '8000': case '8100': case '8200': case '8300': case '8400':					
					res.status(200).json(await runesIdAPI(req, res));
					break;				
				default:
					throw new HttpError(404, 'id does not reference a tree');
			}
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	return {
		getAllRunesReforgeds: getAllRunesReforgeds,
		getRunesReforgedById: getRunesReforgedById,
		getRunesReforgedByName: getRunesReforgedByName,
		getRunesReforgedImageById: getRunesReforgedImageById,
		getRunesReforgedImageByName: getRunesReforgedImageByName,
		getAllRunes: getAllRunes,
		getRunesReforgedTreeById: getRunesReforgedTreeById
	}
}();

module.exports = RunesReforgedController;