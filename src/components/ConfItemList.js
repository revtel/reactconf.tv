import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import ConfItem from './ConfItem';
import useDimension from '../hooks/use-dimension';

function ConfItemList(props) {
  const {items, onItemClick} = props;
  const {dimension} = useDimension();
  const itemWidth = dimension?.innerWidth > 600 ? 300 : 210;

  return (
    <ListWrapper innerWidth={(items.length + 1) * itemWidth}>
      <div className="items-wrapper">
        {items.map((item, idx) => (
          <ConfItem
            key={idx}
            item={item}
            width={itemWidth}
            onInfoClick={() => onItemClick(item)}
            onWatchClick={() => {
              navigate(`/player?conf=${item.id}`);
            }}
          />
        ))}
      </div>
    </ListWrapper>
  );
}

const ListWrapper = styled.div`
  overflow: auto;
  width: 100%;

  & > .items-wrapper {
    padding: 20px 0px 36px 30px;
    width: ${(props) => props.innerWidth}px;
    display: flex;
    flex-wrap: nowrap;
  }
`;

export default ConfItemList;
