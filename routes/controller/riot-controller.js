const { DDragonService, CHAMPION_DATA, CHAMPION_IMAGE } = require('../services/ddragon-service');
const HttpError = require('../../errors/HttpError');
const axios = require('axios');
const championPath = '/champion.json';

const config = {
	baseURL: require('../../config/ddragon').baseURL
}

const RiotController = function () {
	let championAPI = async (req, res) => {
		try {
			let champions = await axios.get(championPath, config);

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
		let champions = await championAPI(req, res);
		
		if(champions[req.params.name])
			return champions[req.params.name];
		else
			throw new HttpError(404, 'Champion does not exist');
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
			return await championIdAPI(req, res);
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionByName = async (req, res) => {
		try {
			return await championNameAPI(req, res);			
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionImage = (champion) => {
		console.log('b');
		return `${DDragonService.getPath(CHAMPION_IMAGE)}/${champion.image.full}`;
	}

	let getChampionImageById = async (req, res) => {
		try {
			let champion = await championIdAPI(req, res);

			if (champion)
				res.status(200).json({ src: `${DDragonService.getPath(CHAMPION_IMAGE)}/${champion.image.full}` });
			else
				throw new HttpError(404, 'Image not found')
		} catch (ex) {
			res.status(ex.statusCode || 500).json({ errors: ex.msg });
		}
	};

	let getChampionImageByName = async (req, res) => {
		try{
			let champion = await championNameAPI(req, res);
						
			res.status(200).json({src: getChampionImage(champion)});
		}catch(ex){

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