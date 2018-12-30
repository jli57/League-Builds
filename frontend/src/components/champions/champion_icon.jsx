import 'babel-polyfill';
import React from 'react';
import { fetchChampionIcon } from '../../utils/api_util';

let k = ''
async function championIcon(name) {
	try{
		let response = await fetchChampionIcon(name);

		
		return response.data.src;
	}catch(ex){
		console.log('ex');
	}
};

const ChampionIcon = ({champion}) => (
  <img className="champion-img-icon"
    src={ Promise.resolve(championIcon(champion.id)) }
    alt={ champion.name }/>
)

export default ChampionIcon;