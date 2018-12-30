import 'babel-polyfill'
import API_KEY from './api_key';
import axios from 'axios';

export const CHAMPION_DATA = "http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion.json";

// export const fetchChampions = () => {
//   return axios.get('/ddragon/champions/all')
//     .then( (res) => {
//       console.log(res);
//     })
// }


export const fetchChampions = () => {
  return axios.get('/api/ddragon/champions/all');
	// return $.getJSON(CHAMPION_DATA);
}

export const getChampionRotations = () => {
	return $.ajax({
		type: "GET",
		url: `https://na1.api.riotgames.com/lol/platform/v3/champions/1?api_key=${API_KEY}`,
		dataType: "JSON",
		error: (xhr, status) => { console.log(xhr, status) },
	})
};


export const fetchChampionData = (championName) => {
  return $.getJSON(`http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion/${championName}.json`);
	// try {
	// 	axios.get(`http://localhost:8000/ddragon/champions/${championName}`)
	// 		.then(res => console.log(res))
	// 		.catch(ex => console.log(ex));
	// 	return $.getJSON(`http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion/${championName}.json`,
	// 		callback)

	// } catch (ex) {
	// 	console.log(ex);
	// }
}

export const fetchChampionSkillIcon = (spellName) => (
	`http://ddragon.leagueoflegends.com/cdn/8.24.1/img/spell/${spellName}`
)
