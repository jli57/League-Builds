import React from 'react';
import { fetchChampionIcon } from '../../utils/api_util';

const ChampionIcon = ({champion}) => (
  <img className="champion-img-icon"
    src={ fetchChampionIcon(champion.id) }
    alt={ champion.name }/>
)

export default ChampionIcon;