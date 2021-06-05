const latest = require('../../static/snapshots/latest.json');
const previous = require('../../static/snapshots/previous.json');

const getMostViewed = (limit) => {
  return Object.values(latest)
    .sort(
      (a, b) =>
        parseInt((b.stats && b.stats.viewCount) || 0, 10) -
        parseInt((a.stats && a.stats.viewCount) || 0, 10),
    )
    .slice(0, limit);
};

const getNewReleased = (limit) => {
  return Object.values(latest)
    .sort((a, b) => (b.publishedAt > a.publishedAt ? 1 : -1))
    .slice(0, limit);
};

const getRecentViewed = (limit) => {
  const latestVideoList = Object.values(latest).map((video) => ({
    id: video.videoId,
    viewed: parseInt((video.stats && video.stats.viewCount) || 0, 10),
  }));
  const previousVideoList = Object.values(previous).map((video) => ({
    id: video.videoId,
    viewed: parseInt((video.stats && video.stats.viewCount) || 0, 10),
  }));

  let diffVideoViewedList = [];
  for (const video of latestVideoList) {
    const prevItem = previousVideoList.find((v) => v.id === video.id);
    diffVideoViewedList.push({
      id: video.id,
      viewed: video.viewed - (prevItem ? prevItem.viewed : 0),
    });
  }

  return diffVideoViewedList
    .sort((a, b) => b.viewed - a.viewed)
    .slice(0, limit)
    .map((video) => ({...latest[video.id], viewCnt: video.viewed}));
};

module.exports = {getMostViewed, getRecentViewed, getNewReleased};
