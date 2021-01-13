import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import HistoryItem from './HistoryItem';
import useDimension from '../hooks/use-dimension';
import {ScrollBarCss} from './Widgets';

function HistoryItemList(props) {
  const {items, onItemClick} = props;
  const [showScrollBar, setShowScrollBar] = React.useState(false);
  const {dimension} = useDimension();
  const itemWidth = dimension?.innerWidth > 600 ? 300 : 210;

  return (
    <HistoryListWrapper
      innerWidth={(items.length + 1) * itemWidth}
      showScrollBar={showScrollBar}
      onMouseEnter={() => setShowScrollBar(true)}
      onMouseLeave={() => setShowScrollBar(false)}>
      <div className="items-wrapper">
        {items.map((item, idx) => {
          return (
            <HistoryItem
              key={idx}
              item={item}
              width={itemWidth}
              onInfoClick={() => onItemClick(item.seminar)}
              onWatchClick={() => {
                navigate(`/player?conf=${item.seminar.id}&idx=${item.talkIdx}`);
              }}
            />
          );
        })}
      </div>
    </HistoryListWrapper>
  );
}

const HistoryListWrapper = styled.div`
  overflow: auto;
  width: 100%;

  & > .items-wrapper {
    overflow: auto;
    padding: 20px 0px 36px 30px;
    width: ${(props) => props.innerWidth}px;
    display: flex;
  }

  ${ScrollBarCss};
`;

export default HistoryItemList;
