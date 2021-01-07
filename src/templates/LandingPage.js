import React from 'react';
import {navigate} from 'gatsby';
import styled from 'styled-components';
import * as AppContext from '../AppContext';
import * as Widgets from '../components/Widgets';
import SEO from '../components/seo';
import NavBar from '../components/NavBar';
import BannerImage from '../components/BannerImage';
import ConfItemList from '../components/ConfItemList';
import HistoryItemList from '../components/HistoryItemList';
import TalkListPanel from '../components/TalkListPanel';
import SelectChannelBtn from '../components/SelectChannelBtn';
import groupConfByYear from '../utils/groupConfByYear';

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function LandingPage(props) {
  const app = React.useContext(AppContext.Context);
  const [selectedChannel, setSelectedChannel] = React.useState(null);
  const bottomPanelRef = React.useRef();
  const confChannels = app.actions.getAllChannelsData(props.pageContext);
  const confById = React.useMemo(() => {
    const _confMap = {};
    for (const channel of confChannels) {
      for (const conf of channel.items) {
        _confMap[conf.id] = conf;
      }
    }
    return _confMap;
  }, [confChannels]);

  React.useEffect(() => {
    async function showLoading() {
      app.actions.setLoading(true);
      await delay(1000);
      window.scrollTo({top: 0, behavior: 'smooth'});
      app.actions.setLoading(false);
    }

    showLoading();
  }, [selectedChannel, app.actions]);

  const historyCache = app.watchHistoryCache || {};
  const recentWatchedConfs = Object.keys(historyCache)
    .map((k) => ({
      conf: confById[k],
      ...historyCache[k],
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

  const confListByYear = groupConfByYear(
    selectedChannel ? [selectedChannel] : confChannels,
  );

  return (
    <>
      <SEO title="React Conferences" />

      <Wrapper>
        <div style={{position: 'relative'}}>
          <BannerImage />
          <NavBar
            selectedChannel={selectedChannel}
            setSelectedChannel={setSelectedChannel}
          />
        </div>

        <div className="content">
          {recentWatchedConfs.length > 0 && !selectedChannel && (
            <div className="recent-watched">
              <Widgets.FlexRow>
                <YearLabel style={{marginLeft: 30, marginRight: 10}}>
                  KEEP WATCHING
                </YearLabel>
              </Widgets.FlexRow>
              <HistoryItemList
                items={recentWatchedConfs}
                onItemClick={(conf) => bottomPanelRef.current.open(conf)}
                onWatchClick={(conf) => {
                  navigate(`/player?conf=${conf.id}`);
                }}
              />
            </div>
          )}

          {confListByYear.map((conf, idx) => {
            if (!conf.items?.length) {
              return null;
            }

            return (
              <div key={idx}>
                <Widgets.FlexRow>
                  <YearLabel style={{marginLeft: 30, marginRight: 4}}>
                    {conf.year}
                  </YearLabel>
                  <Widgets.Badge style={{transform: 'translateY(-8px)'}}>
                    {conf.items.length}
                  </Widgets.Badge>
                </Widgets.FlexRow>
                <ConfItemList
                  items={conf.items}
                  onItemClick={(conf) => bottomPanelRef.current.open(conf)}
                  onWatchClick={(conf) => {
                    navigate(`/player?conf=${conf.id}`);
                  }}
                />
              </div>
            );
          })}
        </div>
      </Wrapper>

      <TalkListPanel
        getInstance={(inst) => {
          bottomPanelRef.current = inst;
        }}
      />

      <SelectChannelBtn
        confChannels={confChannels}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
      />
    </>
  );
}

const YearLabel = styled.div`
  color: white;
  font-size: 18px;
  font-family: VictorMono;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #4c4c4c;

  & > .navbar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 3;
  }

  & > .content {
    padding: 20px 0px 20px 0px;
    transform: translateY(-160px);
  }

  @media only screen and (max-width: 600px) {
    & > .content {
      transform: translateY(-90px);
    }
  }
`;

export default LandingPage;
