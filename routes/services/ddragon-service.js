const { baseURL, championImage, championPath, itemPath, itemImagePath, championImagePath} = require('../../config/ddragon');

const CHAMPION_DATA = 'CHAMPION_DATA';
const CHAMPION_IMAGE = 'CHAMPION_IMAGE';
const ITEM_DATA = 'ITEM_DATA';
const ITEM_IMAGE = 'ITEM_IMAGE';

const DDragonService = function () {
	let getPath = token => {
		switch (token) {
			case 'CHAMPION_DATA': return baseURL + championPath
			case 'CHAMPION_IMAGE': return baseURL + championImagePath
			case 'ITEM_DATA': return baseURL + itemPath
			case 'ITEM_IMAGE': return baseURL + itemImagePath
			default: return 'false'; // should add throw something
		}
	};

	return {
		getPath: getPath
	}
}();

module.exports = { DDragonService, CHAMPION_DATA, CHAMPION_IMAGE, ITEM_DATA, ITEM_IMAGE };