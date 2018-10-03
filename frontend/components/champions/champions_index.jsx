import React from 'react';
import ChampionsIndexItem from './champions_index_item';

const ChampionsIndex = ({champions}) => {
  return (
    <ul className="champion-list">
      { champions.map(champion => <ChampionsIndexItem key={champion.key} champion={champion} />) }
    </ul>
  );
}

export default ChampionsIndex;
