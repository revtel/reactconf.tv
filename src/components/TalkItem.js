import React from 'react';
import styled from 'styled-components';
import * as Ant from 'antd';
import * as Widgets from './Widgets';
import * as AppContext from '../AppContext';
import ProgressBar from './ProgressBar';
import {CheckCircle} from '@styled-icons/material';

function TalkItem(props) {
  const {talk, idx, currIdx, onItemClick} = props;
  const app = React.useContext(AppContext.Context);
  const videoId = talk.snippet.resourceId.videoId;
  const progress = (app.videoProgressCache || {})[videoId];
  const duration = (app.videoDurationCache || {})[videoId];
  const finished = (app.videoFinishedCache || {})[videoId];

  const isPlaying = idx !== undefined && idx === currIdx;

  return (
    <TalkItemWrapper>
      <div className="talk-thumb">
        <img
          src={talk.snippet.thumbnails.standard?.url}
          alt="snapshot for the talk"
        />
        {idx !== undefined && <div className="idx">{idx + 1}</div>}
      </div>

      <div className={'talk-title'}>
        <Progress progress={progress} duration={duration} finished={finished} />

        <div style={{padding: '0px 10px 10px 10px'}}>
          <div style={{marginBottom: 10}}>{talk.snippet.title}</div>

          <Widgets.FlexRow style={{justifyContent: 'flex-end'}}>
            <Ant.Button
              style={{marginRight: 5}}
              type="primary"
              onClick={() => onItemClick({talk, idx})}>
              Watch
            </Ant.Button>
            <Ant.Button
              style={{marginRight: 5}}
              onClick={() =>
                app.actions.setVideoFinished(videoId, finished ? false : true)
              }>
              {finished ? 'Reset progress' : 'Mark as finished'}
            </Ant.Button>
          </Widgets.FlexRow>
        </div>
      </div>

      {isPlaying && <div className="now-playing">Now Playing</div>}
    </TalkItemWrapper>
  );
}

const TalkItemWrapper = styled.div`
  margin-bottom: 10px;
  padding-bottom: 5px;
  position: relative;
  overflow: visible;

  & .talk-thumb {
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

    & > .idx {
      position: absolute;
      top: 0;
      left: 0;
      width: 30px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background-color: #e50914;
      color: white;
    }
  }

  & .talk-title {
    width: 100%;
    color: gray;
    font-size: 14px;
    font-family: VictorMono;
    background-color: white;
    margin-bottom: 5px;
  }

  & .now-playing {
    position: absolute;
    top: -10px;
    right: -10px;
    padding: 10px;
    background-color: #e50914;
    color: white;
    z-index: 12;
  }
`;

function Progress(props) {
  const {progress, duration, finished} = props;

  if (finished || progress === undefined || duration === undefined) {
    return (
      <>
        <ProgressBar percentage={finished ? 100 : 0} />
        <Widgets.FlexRow style={{justifyContent: 'flex-end', padding: 5}}>
          {finished && (
            <CheckCircle size={20} color="#46cb18" style={{margin: 3}} />
          )}
          <div
            style={{
              color: finished ? '#46cb18' : 'black',
              fontWeight: finished ? 'bold' : 'normal',
            }}>
            {finished ? 'FINISHED' : 'NOT STARTED'}
          </div>
        </Widgets.FlexRow>
      </>
    );
  }

  const percentage = 100 * (progress / duration);
  const currMin = ('00' + Math.floor(progress / 60).toString()).slice(-2);
  const currSec = ('00' + Math.floor(progress - currMin * 60).toString()).slice(
    -2,
  );

  return (
    <>
      <ProgressBar percentage={percentage} />
      <Widgets.FlexRow style={{justifyContent: 'flex-end', padding: 5}}>
        {`Currently in ${currMin}:${currSec}`}
      </Widgets.FlexRow>
    </>
  );
}

export default TalkItem;
