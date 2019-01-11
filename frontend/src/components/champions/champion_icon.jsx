import React from 'react';
import styled from 'styled-components';

export const StyledChampionIcon = styled.img`
  width: 100px;
`;

const ChampionIcon = ({champion}) => {
  return (
    <StyledChampionIcon
      src={ champion.image }
      alt={ champion.name } />
  );
}


export default ChampionIcon;