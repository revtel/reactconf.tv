import React from 'react';
import styled from 'styled-components';
import {navigate} from 'gatsby';
import ReactPlayer from 'react-player/youtube';
import {SkipNext, SkipPrevious, Home} from '@styled-icons/material';
import SEO from '../components/seo';
import * as Widgets from '../components/Widgets';
import * as AppContext from '../AppContext';
import TvControl from '../components/TvControl';
import useDimension from '../hooks/use-dimension';
const qs = require('query-string');

function PlayerPage(props) {
  const {location} = props;
  const app = React.useContext(AppContext.Context);
  const playerRef = React.useRef(null);
  const [loading, setLoading] = React.useState(true);
  const [confData, setConfData] = React.useState(null);
  const [showNavbar, setShowNavbar] = React.useState(false);
  const [firstProgressLoaded, setFirstProgressLoaded] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const {dimension} = useDimension();
  const confId = qs.parse(location.search).conf;
  const currIdx = parseInt(qs.parse(location.search).idx || 0);
  const videoId = confData?.items[currIdx].videoId;

  React.useEffect(() => {
    app.actions.setLoading(true);
  }, [currIdx, app.actions]);

  React.useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setConfData(await app.actions.fetchPlaylistItems(confId));
      setLoading(false);
    }

    fetchData();
  }, [confId, app.actions]);

  React.useEffect(() => {
    setFirstProgressLoaded(false);
  }, [videoId]);

  const onProgressCallback = React.useCallback(
    async (evt) => {
      if (evt.playedSeconds > 0) {
        if (!firstProgressLoaded) {
          setFirstProgressLoaded(true);
          const prevProgress = app.actions.getVideoProgressFromCache(videoId);
          if (prevProgress) {
            playerRef.current.seekTo(prevProgress);
            app.actions.setToast(
              `Playback resumed from ${new Date(prevProgress * 1000)
                .toISOString()
                .substr(11, 8)}`,
            );
            return;
          }
        }

        await app.actions.setVideoProgress(
          videoId,
          playerRef.current.getCurrentTime(),
        );
        await app.actions.setVideoDuration(
          videoId,
          playerRef.current.getDuration(),
        );
        await app.actions.setWatchHistory({
          confId,
          talkIdx: currIdx,
          talkData: confData.items[currIdx],
        });
      }
    },
    [videoId, app.actions, confId, currIdx, firstProgressLoaded],
  );

  const onEndedCallback = React.useCallback(() => {
    app.actions.setVideoFinished(videoId, true);
    app.actions.setVideoProgress(videoId, 0);
    if (currIdx < confData?.items.length - 1) {
      navigate(`/player?conf=${confId}&idx=${currIdx + 1}`);
    }
  }, [confId, currIdx, confData, videoId, app.actions]);

  const onReadyCallback = React.useCallback(() => {
    app.actions.setLoading(false);
  }, [app.actions]);

  const onPlayCallback = React.useCallback(() => {
    setPlaying(true);
  }, []);

  const onPauseCallback = React.useCallback(() => {
    setPlaying(false);
  }, []);

  function onPlayerRef(ref) {
    playerRef.current = ref;
    window.playerRef = ref;
  }

  if (!confId || loading) {
    return null;
  }

  const isFinished = (app.videoFinishedCache || {})[videoId];

  function toggleFinishedState() {
    app.actions.setVideoFinished(videoId, !isFinished);
    app.actions.setToast(
      isFinished ? 'Unset finished done' : 'Progress set to finished',
    );
  }

  function calcBestPlayerLayout() {
    const {innerWidth, innerHeight} = dimension;
    const ratio = innerWidth / innerHeight;

    if (ratio > 16 / 9) {
      const width = (innerHeight / 9) * 16;
      return {
        top: 0,
        left: (innerWidth - width) / 2,
        height: innerHeight,
        width,
      };
    } else {
      const height = (innerWidth / 16) * 9;
      return {
        top: (innerHeight - height) / 2,
        left: 0,
        width: innerWidth,
        height,
      };
    }
  }

  function goToTalk(idx) {
    if (0 < idx && idx < confData.items.length) {
      navigate(`/player?conf=${confId}&idx=${idx}`);
    }
  }

  const playerLayout = calcBestPlayerLayout();

  return (
    <>
      <SEO title="Conference Talk Player" />

      <Wrapper height={dimension.innerHeight}>
        <TitleBar visible={showNavbar}>
          <Widgets.FlexRow
            style={{transform: 'translateX(-16px)', marginBottom: 10}}>
            <IconButton
              Icon={Home}
              label="HOME"
              onClick={() => navigate('/')}
            />
            <IconButton
              Icon={SkipPrevious}
              label="PREV"
              onClick={() => goToTalk(currIdx - 1)}
            />
            <IconButton
              Icon={SkipNext}
              label="NEXT"
              onClick={() => goToTalk(currIdx + 1)}
            />
          </Widgets.FlexRow>

          <div className="title">
            <div className="idx">Talk #{currIdx + 1}</div>
            {confData.items[currIdx].title}
          </div>
        </TitleBar>

        <VideoPlayerWrapper {...playerLayout}>
          <ReactPlayer
            key={`${confId}-${currIdx}`}
            ref={onPlayerRef}
            className="react-player"
            url={`https://www.youtube.com/watch?v=${confData.items[currIdx].videoId}`}
            width="100%"
            height="100%"
            controls={true}
            playing={playing}
            onReady={onReadyCallback}
            onPlay={onPlayCallback}
            onPause={onPauseCallback}
            onEnded={onEndedCallback}
            onProgress={onProgressCallback}
            progressInterval={2000}
          />
        </VideoPlayerWrapper>
      </Wrapper>

      <TvControl
        conf={confData}
        confId={confId}
        currIdx={currIdx}
        goToTalk={goToTalk}
        onExpand={(expand) => {
          setShowNavbar(expand);
        }}
        isFinished={isFinished}
        toggleFinishedState={toggleFinishedState}
      />
    </>
  );
}

function IconButton(props) {
  const {Icon, label, ...extraProps} = props;
  return (
    <Widgets.Button type="text" {...extraProps}>
      <Widgets.FlexRow>
        <Icon size={28} color="white" />
        <div style={{color: 'white'}}>{label}</div>
      </Widgets.FlexRow>
    </Widgets.Button>
  );
}

const Wrapper = styled.div`
  background-color: #4c4c4c;
  width: 100vw;
  height: ${(props) => props.height + 'px' || '100vh'};
`;

const VideoPlayerWrapper = styled.div`
  position: absolute;
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;

  & > .react-player {
    position: absolute;
    top: 0;
    left: 0;
    background-color: black;
  }
`;

const TitleBar = styled.div`
  position: fixed;
  top: 0;
  padding: 20px;
  width: 100%;
  background: linear-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
  z-index: ${(props) => (props.visible ? 8 : -1)};
  opacity: ${(props) => (props.visible ? 1 : 0)};
  transition: 1000ms;

  & > .title {
    color: white;
    font-size: 16px;
    margin-right: 15px;
    font-family: Roboto;
    letter-spacing: 1px;
    padding: 15px;
    border-left: 3px solid #4f77e2;
    position: relative;
    display: flex;
    flex-direction: column;

    & > .idx {
      padding: 0px 8px;
      align-self: flex-start;
      text-align: center;
      background-color: #4f77e2;
    }
  }
`;

export default PlayerPage;
