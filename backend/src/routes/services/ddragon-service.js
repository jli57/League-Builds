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
const {latestVersion} = require('../../../config/settings');
const ALL_CHAMPIONS = 'ALL_CHAMPIONS';
const CHAMPION_DATA = 'CHAMPION_DATA';
const CHAMPION_IMAGE = 'CHAMPION_IMAGE';
const ITEM_DATA = 'ITEM_DATA';
const ITEM_IMAGE = 'ITEM_IMAGE';
const RUNESREFORGED_DATA = 'RUNESREFORGED_DATA';
const RUNESREFORGED_IMAGE = 'RUNESREFORGED_IMAGE';
const VERSION = 'VERSION';

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

	return {
		getPath: getPath
	}
}();

module.exports = { DDragonService, ALL_CHAMPIONS, CHAMPION_DATA, CHAMPION_IMAGE, ITEM_DATA, ITEM_IMAGE, RUNESREFORGED_DATA, RUNESREFORGED_IMAGE, VERSION };