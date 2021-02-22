import latest from '../../static/snapshots/latest.json';
import previous from '../../static/snapshots/previous.json';
import * as R from 'ramda';

const getChannelsOfTrendingNow = (channels) => {
  const latestGroupList = R.pipe(
    R.values,
    R.groupBy((item) => item.playlistId),
    R.values,
  )(latest);

  const previousGroupList = R.pipe(
    R.values,
    R.groupBy((item) => item.playlistId),
    R.values,
  )(previous);

  const getStatsSum = (field) =>
    R.reduce(
      (acc, cur) =>
        (acc = acc += isNaN(parseInt(cur.stats ? cur.stats[field] : null))
          ? 0
          : parseInt(cur.stats ? cur.stats[field] : null)),
      0,
    );

  const latestViewCountSumList = R.pipe(
    R.map((item) => ({
      playlistId: item[0].playlistId,
      sum: getStatsSum('viewCount')(item),
    })),
  )(latestGroupList);

  const previousViewCountSumList = R.pipe(
    R.map((item) => ({
      playlistId: item[0].playlistId,
      sum: getStatsSum('viewCount')(item),
    })),
  )(previousGroupList);

  return R.pipe(
    R.addIndex(R.map)((item, index) => ({
      playlistId: item.playlistId,
      sum: item.sum - previousViewCountSumList[index].sum,
    })),
    R.sort((a, b) => b.sum - a.sum),
    R.map((playlist) =>
      channels.find(
        (channel) =>
          !!channel.items.find((item) => item.id === playlist.playlistId),
      ),
    ),
    R.filter((item) => !!item),
    R.uniq(),
    R.slice(0, 5),
    R.map((channel) => ({
      channel: channel,
      id: channel.items[0].id,
      title: channel.items[0].title,
      thumbnail: channel.items[0].thumbnail,
      totalCount: channel.items[0].totalCount,
    })),
  )(latestViewCountSumList);
};

export default getChannelsOfTrendingNow;
