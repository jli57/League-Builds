import 'babel-polyfill';
import React from 'react';

const ChampionIcon = ({champion}) => {
  return (
    <img className="champion-img-icon"
      src={ champion.image.full }
      alt={ champion.name }/>
  );
}


export default ChampionIcon;