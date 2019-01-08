import React from 'react';
import ChampionIcon from './champion_icon';
import { Link } from 'react-router-dom';

const ChampionsIndexItem = ({champion, fetchChampionData}) => {

  const handleClick = () => {
    return fetchChampionData(champion._id);
  }

  return (
    <li onClick={ handleClick } className="champion-icon">
      <Link to="/build">
        <ChampionIcon champion={champion}/>
        <p className="champion-name">{ champion.name }</p>
      </Link>
    </li>
  )
}

export default ChampionsIndexItem
