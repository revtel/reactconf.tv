import React from 'react';
import styled from 'styled-components';
import {useRevent} from 'revent-lib';
import * as AppContext from '../AppContext';
import TalkItem from '../components/TalkItem';

const TranState = {
  NONE: 0,
  SRC: 1,
  DEST: 2,
};

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function SeminarDetail(props) {
  const [selectedConf] = useRevent('selectedConf');
  const [data, setData] = React.useState({});
  const [tranState, setTranState] = React.useState(TranState.NONE);
  const [showDetail, setShowDetail] = React.useState(false);
  const [confDetail, setConfDetail] = React.useState(null);
  const app = React.useContext(AppContext.Context);

  React.useEffect(() => {
    async function animIn() {
      if (selectedConf) {
        const {rect, item} = selectedConf;
        const padding = 20;
        const destWidth =
          (window.innerWidth > window.innerHeight
            ? window.innerHeight
            : window.innerWidth) -
          2 * padding;
        const destLeft = (window.innerWidth - destWidth) / 2;
        const destHeight = (destWidth / 16) * 9;
        const destTop = (window.innerHeight - destHeight) / 2;
        const destData = {
          top: destTop,
          left: destLeft,
          width: destWidth,
          height: destHeight,
        };

        setData({
          imgSrc: item.thumbnailStd,
          srcData: rect,
          destData,
        });

        setTranState(TranState.SRC);
        await delay(50);
        setTranState(TranState.DEST);

        const results = await Promise.all([
          delay(300),
          app.actions.fetchPlaylistItems(selectedConf.item.id),
        ]);

        setConfDetail(results[1]);
        setShowDetail(true);
      }
    }

    animIn();
  }, [selectedConf, app.actions]);

  async function animOut() {
    setShowDetail(false);
    await delay(500);
    setTranState(TranState.SRC);
    await delay(300);
    setTranState(TranState.NONE);
    setConfDetail(null);
  }

  if (tranState === TranState.NONE) {
    return null;
  }

  function getDisplayData() {
    if (tranState === TranState.SRC) {
      return {...data.srcData, visible: true};
    } else if (tranState === TranState.DEST) {
      return {...data.destData, visible: true};
    } else {
      return {...data.srcData, visible: false};
    }
  }

  const displayData = getDisplayData();
  const conf = selectedConf?.item;

  return (
    <Wrapper
      displayInfo={displayData}
      showDetail={showDetail}
      onClick={animOut}>
      <img src={data.imgSrc} alt="conference" />
      <section>
        {conf && (
          <div className="conf-detail">
            <h2>{conf.title}</h2>
            {(confDetail?.items || []).map((talk, idx) => (
              <TalkItem
                key={idx}
                confId={conf.id}
                idx={idx}
                talk={talk}
                showThumbnail={false}
              />
            ))}
          </div>
        )}
      </section>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;
  overflow: auto;

  visibility: ${(props) => (props.displayInfo.visible ? 'visible' : 'none')};
  pointer-events: ${(props) => (props.displayInfo.visible ? 'auto' : 'none')};
  overscroll-behavior-y: none;
  opacity: ${(props) => (props.displayInfo.visible ? 1 : 0)};
  transition: 200ms;

  & > img {
    position: absolute;
    top: ${(props) => props.displayInfo.top}px;
    left: ${(props) => props.displayInfo.left}px;
    width: ${(props) => props.displayInfo.width}px;
    height: ${(props) => props.displayInfo.height}px;
    opacity: ${(props) => (props.displayInfo.visible ? 1 : 0)};
    object-fit: cover;
    transition: 200ms;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.75), 0 15px 12px rgba(0, 0, 0, 0.6);
  }

  & > section {
    position: absolute;
    top: ${(props) => props.displayInfo.top + props.displayInfo.height}px;
    left: ${(props) => props.displayInfo.left}px;
    width: ${(props) => props.displayInfo.width}px;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.75), 0 15px 12px rgba(0, 0, 0, 0.6);

    & > .conf-detail {
      background-color: #888;
      color: white;
      padding: 0 20px;
      visibility: ${(props) => (props.showDetail ? 'visible' : 'none')};
      max-height: ${(props) => (props.showDetail ? '10000px' : '0px')};
      opacity: ${(props) => (props.showDetail ? 1 : 0)};
      transition: 500ms;
      overflow: hidden;

      & > .talk-item {
        margin-bottom: 20px;
      }
    }
  }
`;

export default SeminarDetail;
