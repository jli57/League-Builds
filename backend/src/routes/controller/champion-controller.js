const { DDragonService, CHAMPION_DATA, SPELL_IMAGE, CHAMPION_IMAGE, ALL_CHAMPIONS } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');
const axios = require('axios');

const ChampionController = function () {

	let allChampionsAPI = async (req, res) => {
		let champions = await axios.get(`${DDragonService.getPath(ALL_CHAMPIONS)}`);

		if (champions) {
			const championData = champions.data.data;
			let result = {};
			for (var champion in championData) {
				const key = championData[champion].key;
				result[key] = championData[champion];
				result[key].image.full = getChampionImage(championData[champion]);
			}
			return result;
		}
		else
			throw new HttpError(404, 'DDragon is down');
	};

	let championAPI = async (req, res) => {

		const championName = await championNameAPI(req, res);

		const result = await axios.get(`${DDragonService.getPath(`CHAMPION_DATA`)}/${championName}.json`);
		if (result) {
			let championData = result.data.data[championName];
			championData.image.full = getChampionImage(result.data.data[championName]);
			return { [req.params.noun]: championData };
		}
		else
			throw new HttpError(404, 'DDragon is down');
	};

	let championIdAPI = async (req, res) => {
		return (await championAPI(req, res))[req.params.noun];
	}

	let championNameAPI = async (req, res) => {
		let champions = await allChampionsAPI(req, res);
		if (champions[req.params.noun]) return champions[req.params.noun].id;

		throw new HttpError(404, 'Champion does not exist');

	}

	let getAllChampions = async (req, res) => {
		try {
			res.status(200).json(await allChampionsAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionById = async (req, res) => {
		try {
			res.status(200).json(await championAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionByName = async (req, res) => {
		try {
			res.status(200).json(await championNameAPI(req, res));
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionImage = (champion) => {
		return `${DDragonService.getPath(CHAMPION_IMAGE)}/${champion.image.full}`;
  }

	let getSpellImage = (spellName) => {
		return `${DDragonService.getPath(SPELL_IMAGE)}/${spellName}`;
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

module.exports = ChampionController;