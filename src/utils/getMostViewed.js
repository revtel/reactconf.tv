import latest from '../../static/snapshots/latest.json';

const getMostViewed = () => {
  let sorted = Object.values(latest)
    .filter((item) => item.stats)
    .sort((a, b) => b.stats.viewCount - a.stats.viewCount);
  return sorted;
};

export default getMostViewed;
