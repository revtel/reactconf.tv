import React from 'react';
import styled from 'styled-components';
import * as AppContext from '../AppContext';
import * as Widgets from '../components/Widgets';
import SEO from '../components/seo';
import NavBar from '../components/NavBar';
import BannerImage from '../components/BannerImage';
import ConfItemList from '../components/ConfItemList';
import HistoryItemList from '../components/HistoryItemList';
import VideoItemList from '../components/VideoItemList';
import {getTop10Videos} from '../utils/getTrendingNow';
import getNewReleases from '../utils/getNewReleaseVideos';
import getMostViewed from '../utils/getMostViewed';
import SelectChannelBtn from '../components/SelectChannelBtn';
import groupConfByYear from '../utils/groupConfByYear';
import ConfDetail from '../components/ConfDetail';
import WidgetWithCollapse from '../components/WidgetWithCollapse';

function LandingPage(props) {
  const app = React.useContext(AppContext.Context);
  const [selectedChannel, setSelectedChannel] = React.useState(null);

  const channels = app.actions.getAllChannelsData(props.pageContext);
  const confById = React.useMemo(() => {
    const resultMap = {};
    for (const channel of channels) {
      for (const conf of channel.items) {
        resultMap[conf.id] = conf;
      }
    }
    return resultMap;
  }, [channels]);

  React.useEffect(() => {
    app.actions.showGlobalSpinner();
  }, [selectedChannel, app.actions]);

  const historyCache = app.watchHistoryCache || {};

  const recentWatchedConfs = Object.keys(historyCache)
    .map((k) => ({
      conf: confById[k],
      ...historyCache[k],
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

  const confListByYear = groupConfByYear(
    selectedChannel ? [selectedChannel] : channels,
  );

  const classicVideos = getMostViewed();

  const top10Videos = getTop10Videos();

  const newReleaseVideos = getNewReleases();

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
                <Label style={{marginLeft: 30, marginRight: 10}}>
                  KEEP WATCHING
                </Label>
              </Widgets.FlexRow>
              <HistoryItemList items={recentWatchedConfs} />
            </div>
          )}

          {top10Videos.length > 0 && !selectedChannel && (
            <div className="trending-now">
              <Widgets.FlexRow>
                <Label style={{marginLeft: 30, marginRight: 10}}>
                  Trending Now
                </Label>
                <Widgets.Badge style={{marginLeft: 8}}>
                  Most Populars Videos
                </Widgets.Badge>
              </Widgets.FlexRow>

              <VideoItemList items={top10Videos} />
            </div>
          )}

          {newReleaseVideos.length > 0 && !selectedChannel && (
            <div className="new-release">
              <Widgets.FlexRow>
                <Label style={{marginLeft: 30, marginRight: 10}}>
                  New Releases
                </Label>
                <Widgets.Badge style={{marginLeft: 8}}>
                  New Releases Videos
                </Widgets.Badge>
              </Widgets.FlexRow>

              <VideoItemList items={newReleaseVideos} />
            </div>
          )}

          {confListByYear.map((confList, idx) => {
            if (!confList.items?.length) {
              return null;
            }

            return (
              <div key={idx}>
                <Widgets.FlexRow>
                  <Label style={{marginLeft: 30, marginRight: 4}}>
                    {confList.year}
                  </Label>
                  <Widgets.Badge style={{marginLeft: 8}}>
                    {confList.items.length}
                  </Widgets.Badge>
                </Widgets.FlexRow>
                <ConfItemList items={confList.items} />
              </div>
            );
          })}

          {classicVideos.length > 0 && !selectedChannel && (
            <div className="classic">
              <Widgets.FlexRow>
                <Label style={{marginLeft: 30, marginRight: 10}}>Classic</Label>
                <Widgets.Badge style={{marginLeft: 8}}>
                  Most Cumulative Views
                </Widgets.Badge>
              </Widgets.FlexRow>

              <VideoItemList items={classicVideos} />
            </div>
          )}
        </div>

        <ConfDetail />
      </Wrapper>

      <SelectChannelBtn
        channels={channels}
        selectedChannel={selectedChannel}
        setSelectedChannel={setSelectedChannel}
      />

      <WidgetWithCollapse />
    </>
  );
}

const Label = styled.div`
  color: white;
  font-size: 18px;
  font-family: Roboto;
  letter-spacing: 1px;
`;

const Wrapper = styled.div`
  min-height: 100vh;
  background-color: #383838;

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
