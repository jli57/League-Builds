import React from 'react';
import { fetchChampionIcon } from '../../utils/api_util';

const ChampionsIndexItem = ({champion}) => {
  return (
    <li>
      <div className="champion-icon">
        <img className="champion-img-icon"
          src={ fetchChampionIcon(champion.id ) }
          alt={ champion.name }/>
        <p>{ champion.name }</p>
      </div>
    </li>
  )
}

export default ChampionsIndexItem
