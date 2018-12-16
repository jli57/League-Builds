const { baseURL, championImage } = require('../../config/ddragon');

const CHAMPION_DATA = 'CHAMPION_DATA';
const CHAMPION_IMAGE = 'CHAMPION_IMAGE';

const DDragonService = function () {
	let getPath = token => {		
		switch (token) {
			case 'CHAMPION_DATA': return baseURL + '/data/en_US/champion.json'
			case 'CHAMPION_IMAGE': return championImage
			default: return 'false';
		}
	};

	return {
		getPath: getPath
	}
}();

module.exports = { DDragonService, CHAMPION_DATA, CHAMPION_IMAGE };