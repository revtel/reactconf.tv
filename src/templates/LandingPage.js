import React from 'react';
import {navigate} from 'gatsby';
import styled from 'styled-components';
import * as AppContext from '../AppContext';
import * as Widgets from '../components/Widgets';
import SEO from '../components/seo';
import NavBar from '../components/NavBar';
import BannerImage from '../components/BannerImage';
import SeminarItemList from '../components/SeminarItemList';
import HistoryItemList from '../components/HistoryItemList';
import TalkListPanel from '../components/TalkListPanel';
import SelectChannelBtn from '../components/SelectChannelBtn';
import groupConfByYear from '../utils/groupConfByYear';
import SeminarDetail from '../components/SeminarDetail';

function LandingPage(props) {
  const app = React.useContext(AppContext.Context);
  const [selectedChannel, setSelectedChannel] = React.useState(null);
  const bottomPanelRef = React.useRef();
  const channels = app.actions.getAllChannelsData(props.pageContext);
  const seminarById = React.useMemo(() => {
    const resultMap = {};
    for (const channel of channels) {
      for (const seminar of channel.items) {
        resultMap[seminar.id] = seminar;
      }
    }
    return resultMap;
  }, [channels]);

  React.useEffect(() => {
    app.actions.showGlobalSpinner();
  }, [selectedChannel, app.actions]);

  const historyCache = app.watchHistoryCache || {};
  const recentWatchedSeminars = Object.keys(historyCache)
    .map((k) => ({
      seminar: seminarById[k],
      ...historyCache[k],
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

  const seminarListByYear = groupConfByYear(
    selectedChannel ? [selectedChannel] : channels,
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
          {recentWatchedSeminars.length > 0 && !selectedChannel && (
            <div className="recent-watched">
              <Widgets.FlexRow>
                <YearLabel style={{marginLeft: 30, marginRight: 10}}>
                  KEEP WATCHING
                </YearLabel>
              </Widgets.FlexRow>
              <HistoryItemList
                items={recentWatchedSeminars}
                onItemClick={(seminar) => bottomPanelRef.current.open(seminar)}
              />
            </div>
          )}

          {seminarListByYear.map((seminarByYear, idx) => {
            if (!seminarByYear.items?.length) {
              return null;
            }

            return (
              <div key={idx}>
                <Widgets.FlexRow>
                  <YearLabel style={{marginLeft: 30, marginRight: 4}}>
                    {seminarByYear.year}
                  </YearLabel>
                  <Widgets.Badge style={{marginLeft: 8}}>
                    {seminarByYear.items.length}
                  </Widgets.Badge>
                </Widgets.FlexRow>
                <SeminarItemList
                  items={seminarByYear.items}
                  onItemClick={(seminar) =>
                    bottomPanelRef.current.open(seminar)
                  }
                  onWatchClick={(seminar) => {
                    navigate(`/player?conf=${seminar.id}`);
                  }}
                />
              </div>
            );
          })}
        </div>

        <SeminarDetail />
      </Wrapper>

      <TalkListPanel
        getInstance={(inst) => {
          bottomPanelRef.current = inst;
        }}
      />

      <SelectChannelBtn
        channels={channels}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
      />
    </>
  );
}

const YearLabel = styled.div`
  color: white;
  font-size: 18px;
  font-family: Roboto;
  letter-spacing: 1px;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #181818;

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
