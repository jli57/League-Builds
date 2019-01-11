import React from 'react';
import ChampionsIndexItem from './champions_index_item';

const ChampionsIndex = ({champions, fetchChampionData}) => {
  return (
    <ul className="champion-list">
      { champions.map(champion => (
          <ChampionsIndexItem
            key={champion.id}
            champion={champion}
            fetchChampionData={fetchChampionData} />)
        )
      }
    </ul>
  );
}

export default ChampionsIndex;
