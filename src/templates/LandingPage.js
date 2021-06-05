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
import {
  getMostViewed,
  getNewReleased,
  getRecentViewed,
} from '../utils/getVideoByStat';
import SelectChannelBtn from '../components/SelectChannelBtn';
import groupConfByYear from '../utils/groupConfByYear';
import ConfDetail from '../components/ConfDetail';
import WidgetWithCollapse from '../components/WidgetWithCollapse';

function LandingPage(props) {
  const app = React.useContext(AppContext.Context);
  const [selectedChannel, setSelectedChannel] = React.useState(null);
  const {channels} = props.pageContext;
  const confById = React.useMemo(
    () =>
      channels.reduce((acc, channel) => {
        for (const conf of channel.items) {
          acc[conf.id] = conf;
        }
        return acc;
      }, {}),
    [channels],
  );

  const confListByYear = groupConfByYear(
    selectedChannel ? [selectedChannel] : channels,
  );

  const classicVideos = getMostViewed(10);
  const trendingNowVideos = getRecentViewed(10);
  const newReleaseVideos = getNewReleased(10);
  const recentWatchedConfs = Object.keys(app.watchHistoryCache)
    .map((k) => ({
      conf: confById[k],
      ...app.watchHistoryCache[k],
    }))
    .sort((a, b) => b.timestamp - a.timestamp);

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
          {newReleaseVideos.length > 0 && !selectedChannel && (
            <div className="new-release">
              <Widgets.FlexRow>
                <Label>New Releases</Label>
                <Badge>New Releases Videos</Badge>
              </Widgets.FlexRow>

              <VideoItemList items={newReleaseVideos} />
            </div>
          )}

          {trendingNowVideos.length > 0 && !selectedChannel && (
            <div className="trending-now">
              <Widgets.FlexRow>
                <Label>Trending Now</Label>
                <Badge>Most Populars Videos</Badge>
              </Widgets.FlexRow>

              <VideoItemList items={trendingNowVideos} />
            </div>
          )}

          {recentWatchedConfs.length > 0 && !selectedChannel && (
            <div
              className="recent-watched"
              style={{backgroundColor: '#2e2e2e'}}>
              <Widgets.FlexRow>
                <Label>Keep Watching</Label>
              </Widgets.FlexRow>
              <HistoryItemList items={recentWatchedConfs} />
            </div>
          )}

          {confListByYear.map((confList, idx) => {
            if (!confList.items?.length) {
              return null;
            }

            return (
              <div key={idx} style={{backgroundColor: '#212121'}}>
                <Widgets.FlexRow>
                  <Label>{confList.year}</Label>
                  <Badge>{confList.items.length}</Badge>
                </Widgets.FlexRow>
                <ConfItemList items={confList.items} />
              </div>
            );
          })}

          {classicVideos.length > 0 && !selectedChannel && (
            <div className="classic">
              <Widgets.FlexRow>
                <Label>Classic</Label>
                <Badge>Most Cumulative Views</Badge>
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
  font-size: 22px;
  font-family: Roboto;
  font-style: italic;
  letter-spacing: 1px;
  margin: 16px 10px 0px 30px;
`;

const Badge = styled(Widgets.Badge)`
  margin-top: 8px;
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
