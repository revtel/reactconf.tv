import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import VideoItem from './VideoItem';
import useDimension from '../hooks/use-dimension';
import {ScrollBarCss} from './Widgets';

function VideoItemList(props) {
  const {items} = props;
  const [showScrollBar, setShowScrollBar] = React.useState(false);
  const {dimension} = useDimension();
  const itemWidth = dimension?.innerWidth > 600 ? 300 : 210;

  return (
    <VideoItemListWrapper
      innerWidth={(items.length + 1) * itemWidth}
      showScrollBar={showScrollBar}
      onMouseEnter={() => setShowScrollBar(true)}
      onMouseLeave={() => setShowScrollBar(false)}>
      <div className="items-wrapper">
        {items.map((item, idx) => {
          return (
            <VideoItem
              key={idx}
              item={item}
              width={itemWidth}
              onWatchClick={() => {
                navigate(`/player?conf=${item.playlistId}&idx=${item.idx}`);
              }}
            />
          );
        })}
      </div>
    </VideoItemListWrapper>
  );
}

const VideoItemListWrapper = styled.div`
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

export default VideoItemList;
