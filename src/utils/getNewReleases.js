import latest from '../../static/snapshots/latest.json';
import previous from '../../static/snapshots/previous.json';
import {filterOutUnexpectedData, restructureToSeminars} from './getTrendingNow';
import * as R from 'ramda';

const getNewReleases = (channels) => {
  return R.pipe(
    R.map((key) => {
      if (!(key in previous)) {
        return key;
      }
      return null;
    }),
    R.filter((key) => !!key),
    R.map((key) => latest[key].playlistId),
    R.uniq,
    R.map((key) => ({playlistId: key})),
    restructureToSeminars(channels),
    filterOutUnexpectedData(),
  )(Object.keys(latest));
};

export default getNewReleases;
