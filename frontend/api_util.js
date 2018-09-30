import API_KEY from './api_key';

const APIUtil = {
  champions: "http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json",
  getChampionRotations: () => (
    $.ajax({
      type: "GET",
      url: `https://na1.api.riotgames.com/lol/platform/v3/champions/1?api_key=${API_KEY}`,
      dataType: "JSON",
      error: (xhr, status) => { console.log(xhr, status) },
    })
  ),
  getChampions: (callback) => (
    $.getJSON("http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json", callback )
  ),
  getChampion: (championName, callback) => {
    $.getJSON(`http://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion/${championName}.json`,
      callback )
  },
  championIcon: (championName) => (
    `http://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${championName}.png`
  ),
};


export default APIUtil;
