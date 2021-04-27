import latest from '../../static/snapshots/latest.json';
import previous from '../../static/snapshots/previous.json';
import * as R from 'ramda';

const getNewReleaseVideos = () => {
  return R.pipe(
    R.map((key) => {
      if (!(key in previous)) {
        console.log(key);
        return key;
      }
      return null;
    }),
    R.filter((key) => !!key),
    R.map((key) => latest[key]),
  )(Object.keys(latest));
};

export default getNewReleaseVideos;
