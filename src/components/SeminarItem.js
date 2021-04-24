import React from 'react';
import styled from 'styled-components';
import {PlayArrow} from '@styled-icons/material';
import * as Widgets from './Widgets';

function SeminarItem(props) {
  const {item, width, onInfoClick, onWatchClick} = props;
  const height = width * (10 / 16);

  return (
    <Wrapper onClick={onInfoClick} style={{width, height}}>
      <img src={item.thumbnail} alt="conference snapshot" />
      <div className="info">
        <div className="title">{item.title}</div>
      </div>
      <Widgets.Button
        type="outlined"
        style={{position: 'absolute', right: 8, bottom: 8}}
        onClick={(e) => {
          e.stopPropagation();
          onWatchClick(item);
        }}>
        <div style={{display: 'flex', alignItems: 'center'}}>
          <PlayArrow size={18} color={'#4f77e2'} />
          <div
            style={{
              color: '#4f77e2',
            }}>{`${item.totalCount} Talks`}</div>
        </div>
      </Widgets.Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  margin-right: 20px;
  color: white;
  background-color: #ccc;
  border-radius: 3px;
  transition: 250ms;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  overflow: hidden;

  & > img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  & > .info {
    background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    padding: 8px;
    color: white;

    & > .title {
      font-family: Roboto;
      letter-spacing: 1px;
    }
  }
`;

export default SeminarItem;
