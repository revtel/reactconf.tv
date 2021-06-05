import React from 'react';
import styled from 'styled-components';
import {useOutletSetter} from 'reconnect.js';
import {PlayArrow} from '@styled-icons/material';
import * as Widgets from './Widgets';

function VideoItem(props) {
  const {item, width, onWatchClick} = props;
  const setSelectedConf = useOutletSetter('selectedConf');
  const imgRef = React.useRef();

  function onInfoClick() {
    const rect = imgRef.current.getBoundingClientRect();
    setSelectedConf({
      item: {
        id: item.playlistId,
        thumbnailStd: item.thumbnail,
      },
      rect: {
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      },
    });
  }

  return (
    <Wrapper style={{width}}>
      <div className="img-wrapper">
        <img src={item.thumbnail} alt="conference snapshot" ref={imgRef} />
        <div className="gradient" />

        <button className="play" onClick={onWatchClick}>
          <PlayArrow size={50} color="red" style={{padding: 0}} />
        </button>
      </div>

      <div className="content">
        <div className="title">
          <div>{item.title}</div>
        </div>
        <Widgets.Button style={{width: '100%'}} onClick={onInfoClick}>
          {`ALL CONFERENCE TALKS`}
        </Widgets.Button>
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  border-radius: 4px;
  background-color: #ddd;
  margin-right: 20px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;

  & > .img-wrapper {
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
    background-color: #ccc;

    & > img {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    & > button.play {
      position: absolute;
      overflow: hidden;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: rgba(0, 0, 0, 0.3);
      border: 4px solid red;
      border-radius: 50%;
      cursor: pointer;
      outline: none;
      padding: 0;
      &:active {
        transform: translate(-50%, -50%) scale(1.1);
      }
    }

    & > .gradient {
      position: absolute;
      bottom: 0px;
      left: 0px;
      padding: 10px;
      width: 100%;
      height: 50%;
      background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.9));
    }
  }

  & > .content {
    padding: 10px;
    background-color: rgba(0, 0, 0, 0.9);

    & > .title {
      height: 90px;
      color: white;
      text-align: center;
      font-family: Roboto;
      letter-spacing: 1px;
    }
  }
`;

export default VideoItem;
