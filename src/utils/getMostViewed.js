import latest from '../../static/snapshots/latest.json';

const getMostViewed = () => {
  return Object.values(latest)
    .filter((item) => item.stats?.viewCount)
    .sort((a, b) => parseInt(b.stats.viewCount) - parseInt(a.stats.viewCount))
    .slice(0, 10);
};

export default getMostViewed;
