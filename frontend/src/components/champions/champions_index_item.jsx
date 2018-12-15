import React from 'react';
import { fetchChampionIcon } from '../../utils/api_util';


const ChampionsIndexItem = ({champion, fetchChampionData}) => {

  const handleClick = () => {
    return fetchChampionData(champion.id).then(
      () => {
        $("#champion-data").removeClass("hidden");
      }
    );
  }

  return (
    <li onClick={ handleClick } className="champion-icon">
      <img className="champion-img-icon"
        src={ fetchChampionIcon(champion.id) }
        alt={ champion.name }/>
      <p className="champion-name">{ champion.name }</p>
    </li>
  )
}

export default ChampionsIndexItem
