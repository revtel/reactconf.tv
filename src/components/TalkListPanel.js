import React from 'react';
import {navigate} from 'gatsby';
import SlideInPanel from './SlideInPanel';
import styled from 'styled-components';
import useDimension from '../hooks/use-dimension';
import {Close} from '@styled-icons/material';
import * as AppContext from '../AppContext';
import TalkList from '../components/TalkList';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function BottomPanelContent(props) {
  const {conf, close} = props;
  const [confDetail, setConfDetail] = React.useState(null);
  const app = React.useContext(AppContext.Context);

  React.useEffect(() => {
    async function fetchData() {
      await delay(600);
      setConfDetail(await app.actions.fetchPlaylistItems(conf.id));
    }

    setConfDetail(null);
    fetchData();
  }, [conf.id, app.actions]);

  return (
    <Wrapper onClick={close}>
      <Content
        onClick={(evt) => {
          evt.stopPropagation();
        }}>
        <div className="title-bar">
          <div className="title">{conf.snippet.title}</div>
          <Close size={24} onClick={close} />
        </div>
        <div className="scroll-area">
          {!confDetail && <div className="loading">Loading...</div>}

          {confDetail && (
            <TalkList
              conf={confDetail}
              onItemClick={({talk, idx}) => {
                navigate(`/player?conf=${conf.id}&idx=${idx}`);
              }}
            />
          )}
        </div>
      </Content>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 100%;
  background-color: transparent;
  height: 100%;
  padding-top: 30px;
`;

const Content = styled.div`
  max-width: 600px;
  margin: 10px auto;
  height: 100%;
  background-color: #ccc;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  position: relative;

  & > .title-bar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: white;
    border-top-right-radius: 20px;
    border-top-left-radius: 20px;
    padding: 0 20px;
    display: flex;
    align-items: center;
    background-color: white;
    z-index: 1;
    box-shadow: 0 4px 2px -2px gray;

    & > .title {
      flex: 1;
      font-family: VictorMonoItalic;
    }
  }

  & > .scroll-area {
    padding: 60px 20px;
    height: 100%;
    overflow: auto;

    & > .loading {
      font-family: VictorMono;
    }
  }
`;

function TalkListPanel(props) {
  const {dimension, direction = 'bottom'} = useDimension();
  const app = React.useContext(AppContext.Context);
  let panelProps = null;

  if (direction === 'bottom') {
    panelProps = {
      position: 'bottom',
      size: dimension?.innerHeight * 0.8 || 500,
      style: {backgroundColor: 'transparent'},
    };
  } else {
    // left
    panelProps = {
      position: 'left',
      size: 280,
    };
  }

  return (
    <SlideInPanel
      {...panelProps}
      getInstance={(inst) => {
        props.getInstance({
          open: async (conf) => {
            if (direction === 'bottom') {
              inst.open(
                <BottomPanelContent
                  conf={conf}
                  close={inst.close.bind(inst)}
                />,
              );
            } else {
              // left
              const confDetail = await app.actions.fetchPlaylistItems(conf.id);
              inst.open(
                <div style={{height: '100%', overflow: 'auto'}}>
                  <TalkList
                    conf={confDetail}
                    onItemClick={({talk, idx}) => {
                      navigate(`/player?conf=${conf.id}&idx=${idx}`);
                    }}
                  />
                </div>,
              );
            }
          },
          close: () => {
            inst.close();
          },
        });
      }}
    />
  );
}

export default TalkListPanel;
