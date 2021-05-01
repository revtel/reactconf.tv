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
            <div className="item" key={idx}>
              <VideoItem
                key={idx}
                item={item}
                width={itemWidth}
                onWatchClick={() => {
                  navigate(`/player?conf=${item.playlistId}&idx=${item.idx}`);
                }}
              />

              <div className="rank">{idx + 1}</div>
            </div>
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

    & > .item {
      position: relative;
      & > .rank {
        position: absolute;
        bottom: -25px;
        right: 15px;
        color: white;
        font-size: 72px;
        font-style: italic;
        text-shadow: 3px 3px 5px #000;
      }
    }
  }

  ${ScrollBarCss};
`;

export default VideoItemList;
