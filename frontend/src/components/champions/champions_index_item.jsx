import React from 'react';
import ChampionIcon from './champion_icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledChampionIndexItem = styled.li`
  border: 1px solid #444444;
  padding: 8px;
  margin: 8px;
  background-color: black;
  color: white;

  &:hover {
    cursor: pointer;
    background-color: #51b2e8;
    color: black;
  }
`;

const StyledChampionName = styled.p`
  letter-spacing: .5;
  font-size: 13px;
`;

const ChampionsIndexItem = ({champion, fetchChampionData}) => {

  const handleClick = () => {
    return fetchChampionData(champion.id);
  }

  return (
    <StyledChampionIndexItem onClick={ handleClick }>
      <Link to="/build">
        <ChampionIcon champion={champion}/>
         <StyledChampionName>{ champion.name }</StyledChampionName>
      </Link>
    </StyledChampionIndexItem>
  )
}

export default ChampionsIndexItem
