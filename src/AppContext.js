import React from 'react';
import * as idbKeyval from 'idb-keyval';

const Context = React.createContext();
let VideoStore = null;

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

      fetchPlaylistItems: async (playlistId) => {
        const resp = await fetch(`/playlistitems/${playlistId}.json`);
        return await resp.json();
      },

      setWatchHistory: async (confId, talkIdx) => {
        this.watchHistoryCache[confId] = {
          talkIdx,
          timestamp: new Date().getTime(),
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

    if (window.Worker) {
      this.worker = new Worker('/worker.js');
      this.msgs = [];
      this.worker.onmessage = (e) => {
        const msgIdx = this.msgs.findIndex(
          (m) => m.timestamp === e.data.timestamp,
        );
        if (msgIdx > -1) {
          const msg = this.msgs[msgIdx];
          this.msgs.splice(msgIdx, 1);
          msg.callback(null, e.data.response);
        }
      };
      this.sendToWorker = ({type, payload}) => {
        return new Promise((resolve, reject) => {
          const msg = {
            timestamp: Date.now(),
            type,
            payload,
          };
          const callback = (err, resp) => {
            if (err) {
              reject(err);
            } else {
              resolve(resp);
            }
          };
          this.msgs.push({...msg, callback});
          this.worker.postMessage(msg);
        });
      };
    }
  }

  componentWillUnmount() {
    if (this.worker) {
      this.worker.terminate();
    }
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
