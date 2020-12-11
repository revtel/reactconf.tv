importScripts(['/lib/idb-keyval-iife.js']);

var VideoStore = new idbKeyval.Store('reactconftv', 'video');

onmessage = function (e) {
  if (!e.data || !e.data.timestamp || !e.data.type) {
    return;
  }

  if (e.data.type === 'echo') {
    postMessage({
      timestamp: e.data.timestamp,
      response: e.data.payload,
    });
    idbKeyval.set('echo', e.data.payload);
  } else if (e.data.type === 'get-video-progress') {
    idbKeyval
      .get('progress', VideoStore)
      .then((record) => {
        postMessage({
          timestamp: e.data.timestamp,
          response: { resp: record },
        });
      })
      .catch((err) => {
        postMessage({
          timestamp: e.data.timestamp,
          response: { err: err },
        });
      });
  } else if (e.data.type === 'set-video-progress') {
    idbKeyval
      .get('progress', VideoStore)
      .then((record) => {
        if (record === undefined) {
          record = {};
        }

        record[e.data.payload.videoId] = e.data.payload.progress;

        idbKeyval.set('progress', record, VideoStore);

        postMessage({
          timestamp: e.data.timestamp,
          response: { resp: record },
        });
      })
      .catch((err) => {
        postMessage({
          timestamp: e.data.timestamp,
          response: { err: err },
        });
      });
  }
};
