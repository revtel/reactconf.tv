import React from 'react';
import styled from 'styled-components';
import {
  ChevronLeft,
  List,
  CheckBox,
  CheckBoxOutlineBlank,
} from '@styled-icons/material';
import {Heart, HeartDislike} from '@styled-icons/ionicons-sharp';
import TalkList from './TalkList';
import SlideInPanel from './SlideInPanel';
import useDimension from '../hooks/use-dimension';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function TvControlEx(props) {
  const {
    conf,
    currIdx,
    goToTalk,
    onExpand,
    isFinished,
    isInFavorite,
    toggleFinishedState,
    toggleFavoriteState,
  } = props;
  const [expand, _setExpand] = React.useState(false);
  const leftDrawer = React.useRef();
  const {dimension} = useDimension();

  function setExpand(_expand) {
    _setExpand(_expand);
    onExpand(_expand);
  }

  function openTalkList() {
    leftDrawer.current.open(
      <DrawerWrapper>
        <TalkList
          conf={conf}
          currIdx={currIdx}
          onItemClick={async ({talk, idx}) => {
            goToTalk(idx);
            await delay(600);
            leftDrawer.current.close();
            await delay(400);
            setExpand(false);
          }}
        />
      </DrawerWrapper>,
    );
  }

  if (!dimension) {
    return null;
  }

  return (
    <Wrapper expand={expand} dimension={dimension}>
      <Backdrop visible={expand} onClick={() => setExpand(false)} />

      <div className="action-bar">
        <button className="toggle" onClick={() => setExpand(!expand)}>
          <ChevronLeft size={48} color="white" />
        </button>

        <button onClick={openTalkList}>
          <List size={32} color="white" />
        </button>

        <button onClick={toggleFinishedState}>
          {isFinished ? (
            <CheckBox size={30} color="white" />
          ) : (
            <CheckBoxOutlineBlank size={30} color="white" />
          )}
        </button>

        <button onClick={toggleFavoriteState}>
          {isInFavorite ? (
            <HeartDislike size={24} color="white" />
          ) : (
            <Heart size={24} color="white" />
          )}
        </button>
      </div>

      <SlideInPanel
        position="left"
        size={280}
        style={{padding: 0}}
        getInstance={(inst) => {
          leftDrawer.current = inst;
        }}
      />
    </Wrapper>
  );
}

const ICON_SIZE = 60;

const Wrapper = styled.div`
  & > .action-bar {
    position: fixed;
    top: ${(props) => props.dimension.innerHeight - 32 - ICON_SIZE}px;
    right: ${(props) => (props.expand ? 32 : 32 - ICON_SIZE * 4)}px;
    width: ${ICON_SIZE * 4}px;
    height: ${ICON_SIZE}px;
    display: flex;
    align-items: center;
    border-radius: ${ICON_SIZE / 2}px;
    background-color: #e50914;
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
    transition: 200ms;
    overflow: hidden;

    & > button {
      width: ${ICON_SIZE}px;
      height: ${ICON_SIZE}px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: none;
      outline: none;
      cursor: pointer;

      &:active {
        transform: scale(1.05);
      }
    }

    & > button.toggle {
      position: relative;
      left: ${(props) => (props.expand ? 0 : -8)}px;
      border-radius: ${ICON_SIZE / 2}px;
      background-color: ${(props) => (props.expand ? 'gray' : '#e50914')};
      transition: 200ms 100ms;
      transform: ${(props) => (props.expand ? 'rotate(180deg)' : 'none')};
    }
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 200ms;
  background-color: rgba(0, 0, 0, 0.3);
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'auto' : 'none')};
`;

const DrawerWrapper = styled.div`
  height: 100%;
  overflow: auto;
  padding: 10px;
  background-color: #ccc;
`;

export default TvControlEx;
