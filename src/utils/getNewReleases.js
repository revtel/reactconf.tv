import latest from '../../static/snapshots/latest.json';
import previous from '../../static/snapshots/previous.json';
import {restructureToSeminars} from './getTrendingNow';

const getNewReleases = (channels) => {
  return restructureToSeminars(channels)(
    Object.keys(latest)
      .map((key) => {
        if (!(key in previous)) {
          return key;
        }
        return null;
      })
      .filter((key) => !!key)
      .map((key) => {
        return {playlistId: latest[key].playlistId};
      }),
  );
};

export default getNewReleases;
