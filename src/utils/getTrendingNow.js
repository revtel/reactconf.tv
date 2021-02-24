import latest from '../../static/snapshots/latest.json';
import previous from '../../static/snapshots/previous.json';
import * as R from 'ramda';

const aggregateDiffViewCountByPlaylistId = R.reduce((acc, cur) => {
  const curPlaylistId = latest[cur].playlistId;

  let nextViewCount;
  if (cur in previous) {
    nextViewCount =
      !latest[cur].stats || !previous[cur].stats
        ? 0
        : latest[cur].stats.viewCount - previous[cur].stats.viewCount;
  } else {
    nextViewCount = latest[cur].stats ? latest[cur].stats.viewCount : 0;
  }

  acc[curPlaylistId] = acc[curPlaylistId]
    ? acc[curPlaylistId] + nextViewCount
    : nextViewCount;

  return acc;
}, {});

export const restructureToSeminars = (channels) =>
  R.map((playlist) => {
    const theChannel = channels.find(
      (channel) =>
        !!channel.items.find((item) => item.id === playlist.playlistId),
    );
    if (!theChannel) {
      return null;
    }
    return theChannel.items.find((item) => item.id === playlist.playlistId);
  });

const filterOutUnexpectedData = () => R.filter((item) => !!item);

const getTop10Seminars = (channels) => {
  const diffViewCountByPlayListId = aggregateDiffViewCountByPlaylistId(
    Object.keys(latest),
  );

  return R.pipe(
    R.addIndex(R.map)((item, index) => ({
      playlistId: R.keys(diffViewCountByPlayListId)[index],
      sum: item,
    })),
    R.sort((a, b) => b.sum - a.sum),
    R.slice(0, 10),
    restructureToSeminars(channels),
    filterOutUnexpectedData(),
  )(R.values(diffViewCountByPlayListId));
};

export default getTop10Seminars;
