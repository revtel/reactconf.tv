import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import {useOutlet} from 'reconnect.js';
import ConfItem from './ConfItem';
import {ScrollBarCss} from './Widgets';
import {useOutletSetter} from 'reconnect.js';

function ConfItemList(props) {
  const {items} = props;
  const [dimension] = useOutlet('dimension');
  const [showScrollBar, setShowScrollBar] = React.useState(false);
  const setSelectedConf = useOutletSetter('selectedConf');
  const itemWidth = dimension?.innerWidth > 600 ? 300 : 210;

  return (
    <ListWrapper
      innerWidth={(items.length + 1) * itemWidth}
      showScrollBar={showScrollBar}
      onMouseEnter={() => setShowScrollBar(true)}
      onMouseLeave={() => setShowScrollBar(false)}>
      <div className="items-wrapper">
        {items.map((item, idx) => (
          <ConfItem
            key={idx}
            item={item}
            width={itemWidth}
            onInfoClick={(e) => {
              const rect = e.target.getBoundingClientRect();
              setSelectedConf({
                item,
                rect: {
                  top: rect.top,
                  left: rect.left,
                  width: rect.width,
                  height: rect.height,
                },
              });
            }}
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

  ${ScrollBarCss}
`;

export default ConfItemList;
