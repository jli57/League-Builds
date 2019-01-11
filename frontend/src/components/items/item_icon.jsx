import React from 'react';
import styled from 'styled-components';

const StyledItemIcon = styled.img`
  width: 100%;

  &:hover + p {
    display: block;
    position: absolute;
    background: white;
  }
`;

const ItemIcon = ({item}) => {
  return (
    <StyledItemIcon
      src={ item.image }
      alt={ item.name }
      title={ item.name } />
  );
}


export default ItemIcon;