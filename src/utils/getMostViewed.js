import latest from '../../static/snapshots/latest.json';

const getMostViewed = () => {
  return Object.values(latest)
    .filter((item) => item.stats)
    .sort((a, b) => b.stats.viewCount - a.stats.viewCount);
};

export default getMostViewed;
