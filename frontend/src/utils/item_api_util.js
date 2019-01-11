import axios from 'axios';

export const CHAMPION_DATA = "http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion.json";

export const fetchItems = () => {
  return axios.get('/api/ddragon/items/all');
	// return $.getJSON(CHAMPION_DATA);
}

// export const getChampionRotations = () => {
// 	return $.ajax({
// 		type: "GET",
// 		url: `https://na1.api.riotgames.com/lol/platform/v3/champions/1?api_key=${API_KEY}`,
// 		dataType: "JSON",
// 		error: (xhr, status) => { console.log(xhr, status) },
// 	})
// };


export const fetchItem = (itemKey) => {
  return axios.get(`/api/ddragon/items/${championKey}`)
}
