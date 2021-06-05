import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import ConfItem from './ConfItem';
import useDimension from '../hooks/use-dimension';
import {ScrollBarCss} from './Widgets';
import {useRevent} from 'revent-lib';

function ConfItemList(props) {
  const {items} = props;
  const {dimension} = useDimension();
  const [showScrollBar, setShowScrollBar] = React.useState(false);
  // eslint-disable-next-line no-unused-vars
  const [_, setSelectedConf] = useRevent('selectedConf');
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