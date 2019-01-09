import 'babel-polyfill';
import React from 'react';
import styled from 'styled-components';

const StyledChampionIcon = styled.img`
  width: 100%;
`;

const ChampionIcon = ({champion}) => {
  return (
    <StyledChampionIcon className="champion-img-icon"
      src={ champion.image }
      alt={ champion.name } />
  );
}


export default ChampionIcon;