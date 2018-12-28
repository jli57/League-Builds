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
  return $.ajax({
    type: "GET",
    url: "/ddragon/champions/all"
  })
}

export const getChampionRotations = () => {
  return $.ajax({
      type: "GET",
      url: `https://na1.api.riotgames.com/lol/platform/v3/champions/1?api_key=${API_KEY}`,
      dataType: "JSON",
      error: (xhr, status) => { console.log(xhr, status) },
    })
};

export const fetchChampionIcon = (championName) => (
  `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/champion/${championName}.png`
)

export const fetchChampionData = (championName, callback) => {
  return $.getJSON(`http://ddragon.leagueoflegends.com/cdn/8.24.1/data/en_US/champion/${championName}.json`,
      callback )
}

export const fetchChampionSkillIcon = (spellName) => (
  `http://ddragon.leagueoflegends.com/cdn/8.24.1/img/spell/${spellName}`
)
