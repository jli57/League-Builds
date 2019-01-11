import React from 'react';
import ItemsIndexItem from './items_index_item';
import styled from 'styled-components';

const StyledItemsIndex = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const ItemsIndex = ({items, fetchItem}) => {
  return (
    <StyledItemsIndex>
      { items.map(item => (
          <ItemsIndexItem
            key={item.id}
            item={item}
            fetchItem={fetchItem}
          />)
        )
      }
    </StyledItemsIndex>
  );
}

export default ItemsIndex;
