import React from 'react';
import ItemIcon from './item_icon';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledItemIndexItem =  styled.li`
  width: 75px;
  margin: 3px;
`;

const ItemName = styled.p`
  display: none;
`;


const ItemsIndexItem = ({item, fetchItem}) => {

  const handleClick = () => {
    return fetchItem(item._id);
  }

  return (
    <StyledItemIndexItem onClick={ handleClick }>
      <Link to="/build">
        <ItemIcon item={item}/>
        <ItemName>{ item.name }</ItemName>
      </Link>
    </StyledItemIndexItem>
  )
}

export default ItemsIndexItem;
