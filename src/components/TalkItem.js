import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import * as Widgets from './Widgets';
import * as AppContext from '../AppContext';
import ProgressBar from './ProgressBar';
import {
  CheckBox,
  CheckBoxOutlineBlank,
  PlayCircleOutline,
} from '@styled-icons/material';
import {Heart, HeartFill} from '@styled-icons/octicons';
import useFavoriteState from '../hooks/useFavoriteState';

function TalkItem(props) {
  const {confId, talk, idx, currIdx, onItemClick, showThumbnail = true} = props;
  const largeThumbnail = showThumbnail;
  const app = React.useContext(AppContext.Context);
  const videoId = talk.videoId;
  const progress = app.videoProgressCache[videoId];
  const duration = app.videoDurationCache[videoId];
  const finished = app.videoFinishedCache[videoId];
  const {isInFavorite, toggleFavoriteState} = useFavoriteState({
    confId,
    talkIdx: idx,
  });

  const isPlaying = idx !== undefined && idx === currIdx;
  const percentage = (duration && 100 * (progress / duration)) || 0;

  return (
    <TalkItemWrapper largeThumbnail={largeThumbnail}>
      {largeThumbnail && (
        <Figure style={{width: '100%'}}>
          <img src={talk.thumbnail} alt="snapshot for the talk" />
        </Figure>
      )}

      <div className={'description'}>
        {!largeThumbnail && (
          <Figure
            style={{
              width: 112,
              height: 70,
              margin: '10px 0 10px 10px',
              paddingBottom: 0,
            }}>
            <img src={talk.thumbnail} alt="snapshot for the talk" />
          </Figure>
        )}

        <div style={{padding: 10, flex: 1}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            {isPlaying && (
              <Label style={{background: 'green'}}>Now Playing</Label>
            )}
            {finished && <Label style={{background: 'grey'}}>Finished</Label>}
          </div>

          <div style={{fontSize: 16}}>{talk.title}</div>
        </div>
      </div>

      <Widgets.FlexRow style={{justifyContent: 'flex-end'}}>
        <Widgets.Button
          type="text"
          onClick={(evt) => {
            evt.stopPropagation();
            if (onItemClick) {
              onItemClick({talk, idx});
            } else {
              navigate(`/player?conf=${confId}&idx=${idx}`);
            }
          }}>
          <PlayCircleOutline size={28} color={'red'} />
        </Widgets.Button>

        <Widgets.Button
          type="text"
          onClick={(evt) => {
            evt.stopPropagation();
            toggleFavoriteState({
              title: talk.title,
              thumbnail: talk.thumbnail,
            });
          }}>
          {isInFavorite ? (
            <HeartFill size={24} color={'red'} />
          ) : (
            <Heart size={24} color={'red'} />
          )}
        </Widgets.Button>

        <Widgets.Button
          type="text"
          onClick={(evt) => {
            evt.stopPropagation();
            app.actions.setVideoFinished(videoId, finished ? false : true);
          }}>
          {finished ? (
            <CheckBox size={26} color={'red'} />
          ) : (
            <CheckBoxOutlineBlank size={26} color={'red'} />
          )}
        </Widgets.Button>
      </Widgets.FlexRow>

      {idx !== undefined && <Idx>{idx + 1}</Idx>}
      <ProgressBar percentage={finished ? 100 : percentage} />
    </TalkItemWrapper>
  );
}

const TalkItemWrapper = styled.div`
  margin-bottom: 10px;
  position: relative;
  overflow: visible;
  background-color: white;

  & > .description {
    width: 100%;
    font-size: 14px;
    font-family: Roboto;
    display: flex;
    color: black;
  }
`;

const Label = styled.label`
  font-size: 11px;
  color: white;
  border-radius: 4px;
  padding: 4px 8px;
  margin: 0 6px 8px 0;
`;

const Figure = styled.figure`
  margin: 0;
  padding: 0;
  position: relative;
  background-color: #ccc;
  width: 100%;
  padding-bottom: 56.25%;

  & > img {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Idx = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 30px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  background-color: #4f77e2;
  color: white;
`;

export default TalkItem;
