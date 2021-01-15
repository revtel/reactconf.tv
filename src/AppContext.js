import React from 'react';
import * as idbKeyval from 'idb-keyval';
import {
  transformAllChannelsData,
  transformConfEventData,
} from './utils/transformData';

const Context = React.createContext();

// this global is initialised when Provider mounted, so we won't run into build errors
let VideoStore = null;

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class Provider extends React.Component {
  constructor(props) {
    super(props);
    console.log('App initialization');
    this.state = {
      loading: false,
      toastContent: null,
    };

    this.actions = {
      setLoading: (loading) => this.setState({loading}),

      showGlobalSpinner: async ({ms = 1000, scrollToTop = true} = {}) => {
        this.setState({loading: true});
        await delay(ms);
        this.setState({loading: false});
        if (scrollToTop) {
          if (typeof window !== 'undefined') {
            window.scrollTo({top: 0, behavior: 'smooth'});
          }
        }
      },

      getAllChannelsData: (pageContext) => {
        if (!this._confChannels) {
          this._confChannels = transformAllChannelsData(
            pageContext.confChannels,
          );
        }
        return this._confChannels;
      },

      fetchPlaylistItems: async (playlistId) => {
        const resp = await fetch(`/playlistitems/${playlistId}.json`);
        return transformConfEventData(await resp.json());
      },

      setWatchHistory: async ({confId, talkIdx, talkData}) => {
        this.watchHistoryCache[confId] = {
          talkIdx,
          timestamp: new Date().getTime(),
          talkThumbnail: talkData.thumbnail,
        };
        await idbKeyval.set('history', this.watchHistoryCache, VideoStore);
      },

      saveToFavorite: async (favItem, save) => {
        // favItem should be {confId, talkIdx, title, thumbnail,}
        const idx = this.favoriteCache.findIndex(
          (item) =>
            item.confId === favItem.confId && item.talkIdx === favItem.talkIdx,
        );

        if (save) {
          if (idx > -1) {
            this.favoriteCache[idx] = favItem;
          } else {
            this.favoriteCache.push(favItem);
          }
        } else {
          if (idx > -1) {
            this.favoriteCache.splice(idx, 1);
          }
        }

        await idbKeyval.set('favorite', this.favoriteCache, VideoStore);
        this.forceUpdate();
      },

      isInFavorite: (confId, talkIdx) => {
        return (
          (this.favoriteCache || []).findIndex(
            (item) => item.confId === confId && item.talkIdx === talkIdx,
          ) > -1
        );
      },

      invalidateFavoriteCache: async () => {
        this.favoriteCache =
          (await idbKeyval.get('favorite', VideoStore)) || [];
        console.log('fav loaded', this.favoriteCache);
        this.forceUpdate();
      },

      setVideoDuration: async (videoId, duration) => {
        this.videoDurationCache[videoId] = duration;
        await idbKeyval.set('duration', this.videoDurationCache, VideoStore);
      },

      setVideoProgress: async (videoId, progress) => {
        this.videoProgessCache[videoId] = progress;
        await idbKeyval.set('progress', this.videoProgessCache, VideoStore);
      },

      setVideoFinished: async (videoId, finished) => {
        this.videoFinishedCache[videoId] = !!finished;
        await idbKeyval.set('finished', this.videoFinishedCache, VideoStore);
        this.forceUpdate();
      },

      invalidateWatchHistoryCache: async () => {
        this.watchHistoryCache =
          (await idbKeyval.get('history', VideoStore)) || {};
        this.forceUpdate();
      },

      invalidateVideoFinishedCache: async () => {
        this.videoFinishedCache =
          (await idbKeyval.get('finished', VideoStore)) || {};
        this.forceUpdate();
      },

      invalidateVideoProgressCache: async () => {
        this.videoProgessCache =
          (await idbKeyval.get('progress', VideoStore)) || {};
        this.forceUpdate();
      },

      invalidateVideoDurationCache: async () => {
        this.videoDurationCache =
          (await idbKeyval.get('duration', VideoStore)) || {};
        this.forceUpdate();
      },

      getVideoProgressFromCache: (videoId) => {
        return this.videoProgessCache[videoId];
      },

      calcDisplayTime: (rawTime) => {
        return new Date(rawTime * 1000).toISOString().substr(11, 8);
      },

      setToast: (toastContent) => this.setState({toastContent}),
    };
  }

  async componentDidMount() {
    VideoStore = new idbKeyval.Store('reactconftv', 'video');
    this.actions.invalidateWatchHistoryCache();
    this.actions.invalidateVideoDurationCache();
    this.actions.invalidateVideoProgressCache();
    this.actions.invalidateVideoFinishedCache();
    this.actions.invalidateFavoriteCache();
  }

  render() {
    return (
      <Context.Provider
        value={{
          state: this.state,
          actions: this.actions,
          watchHistoryCache: this.watchHistoryCache,
          videoProgressCache: this.videoProgessCache,
          videoDurationCache: this.videoDurationCache,
          videoFinishedCache: this.videoFinishedCache,
          favoriteCache: this.favoriteCache,
        }}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

export {Context, Provider};
