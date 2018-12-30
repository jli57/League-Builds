import 'babel-polyfill'
import API_KEY from './api_key';
import axios from 'axios';


export const CHAMPION_DATA = "http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion.json";

export const fetchChampions = () => {
	return $.getJSON(CHAMPION_DATA);
}

export const getChampionRotations = () => {
	return $.ajax({
		type: "GET",
		url: `https://na1.api.riotgames.com/lol/platform/v3/champions/1?api_key=${API_KEY}`,
		dataType: "JSON",
		error: (xhr, status) => { console.log(xhr, status) },
	})
};

export const fetchChampionIcon = (championName) => {
	return axios.get(`/api/ddragon/champions/${championName}/image`);
	
	// let k = 
	// 	.then(res => {
	// 		//console.log(res.data.src)
	// 		return res.data.src
	// 	})

	// //console.log(k); 
	// //try{
	// //let k = await axios.get(`http://localhost:8000/api/ddragon/champions/${championName}/image`);
	// //return `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/${championName}.png`;
	// return k;

	//req.then(success => )
	
}

export const fetchChampionData = (championName, callback) => {
	try {
		axios.get(`http://localhost:8000/ddragon/champions/${championName}`)
			.then(res => console.log(res))
			.catch(ex => console.log(ex));
		return $.getJSON(`http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion/${championName}.json`,
			callback)

	} catch (ex) {
		console.log(ex);
	}
}

export const fetchChampionSkillIcon = (spellName) => (
	`http://ddragon.leagueoflegends.com/cdn/8.24.1/img/spell/${spellName}`
)
