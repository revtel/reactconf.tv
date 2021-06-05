import React from 'react';
import styled from 'styled-components';
import {useOutlet} from 'reconnect.js';
import HistoryItem from './HistoryItem';
import {ScrollBarCss} from './Widgets';

function HistoryItemList(props) {
  const {items} = props;
  const [showScrollBar, setShowScrollBar] = React.useState(false);
  const [dimension] = useOutlet('dimension');
  const itemWidth = dimension?.innerWidth > 600 ? 300 : 210;

  return (
    <HistoryListWrapper
      innerWidth={(items.length + 1) * itemWidth}
      showScrollBar={showScrollBar}
      onMouseEnter={() => setShowScrollBar(true)}
      onMouseLeave={() => setShowScrollBar(false)}>
      <div className="items-wrapper">
        {items.map((item, idx) => {
          return <HistoryItem key={idx} item={item} width={itemWidth} />;
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
