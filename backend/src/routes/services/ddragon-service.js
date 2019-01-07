const { baseURL1,
	baseURL,
	allChampionsPath,
	championImage,
	championPath,
	itemPath,
	itemImagePath,
	championImagePath,
	runesReforgedImagePath,
	runesReforgedPath,
	versions
} = require('../../../config/ddragon');
const { latestVersion } = require('../../../config/settings');
const ALL_CHAMPIONS = 'ALL_CHAMPIONS';
const CHAMPION_DATA = 'CHAMPION_DATA';
const CHAMPION_IMAGE = 'CHAMPION_IMAGE';
const ITEM_DATA = 'ITEM_DATA';
const ITEM_IMAGE = 'ITEM_IMAGE';
const RUNESREFORGED_DATA = 'RUNESREFORGED_DATA';
const RUNESREFORGED_IMAGE = 'RUNESREFORGED_IMAGE';
const VERSION = 'VERSION';
const axios = require('axios');
const Champion = require('../../models/champion');

const DDragonService = function () {
	let getPath = token => {
		switch (token) {
			case 'ALL_CHAMPIONS': return `${baseURL1}/${latestVersion}${allChampionsPath}`
			case 'CHAMPION_DATA': return `${baseURL1}/${latestVersion}${championPath}`
			case 'CHAMPION_IMAGE': return `${baseURL1}/${latestVersion}${championImagePath}`
			case 'ITEM_DATA': return baseURL + itemPath
			case 'ITEM_IMAGE': return baseURL + itemImagePath
			case 'RUNESREFORGED_DATA': return baseURL + runesReforgedPath
			case 'RUNESREFORGED_IMAGE': return baseURL1 + runesReforgedImagePath
			case 'VERSION': return versions
			default: return 'false'; // should add throw something
		}
	};

	let replacePeriod = (key) => {
		return key.replace('.', '_');
	}

	let updateChampionImage = (champion) => {
		champion.image = `${getPath(CHAMPION_IMAGE)}/${champion.image.full}`;
		champion.passive.image = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/spell/${champion.passive.image.full}`		
		for (var i = 0; i < champion.spells.length; i++)
			champion.spells[i].image = `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/spell/${champion.spells[i].image.full}`		
	};	

	let insertChampions = async (version) => {
		try {
			let res = (await axios.get(getPath(ALL_CHAMPIONS))).data.data;

			Object.keys(res).forEach(async (key, i) => {				
				let champion = (await axios.get(`${getPath(CHAMPION_DATA)}/${key}.json`)).data.data[key];

				updateChampionImage(champion);				
				await Champion.createChampion(new Champion({
					_id: parseInt(champion.key),
					name: champion.name,
					title: champion.title,
					image: champion.image,
					tags: champion.tags,

					versions: {
						[version]: {
							spells: champion.spells,
							passive: champion.passive,
							stats: champion.stats
						}
					}
				}));
			});

			return true;
		} catch (ex) {
			res.status(404).json({});
		}
	};

	return {
		insertChampions: insertChampions,
		getPath: getPath
	}
}();

module.exports = { DDragonService, ALL_CHAMPIONS, CHAMPION_DATA, CHAMPION_IMAGE, ITEM_DATA, ITEM_IMAGE, RUNESREFORGED_DATA, RUNESREFORGED_IMAGE, VERSION };