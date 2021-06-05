const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const {matchConferenceByTitle} = require('./src/utils/matchConferenceByTitle');
const {transformAllChannelsData} = require('./src/utils/transformData');
const {
  getMostViewed,
  getNewReleased,
  getRecentViewed,
} = require('./src/utils/getVideoByStat');

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;
  const ytChannelsNode = (
    await graphql(
      `
        query MyQuery {
          allFile(filter: {name: {eq: "ytChannels"}}) {
            edges {
              node {
                name
                dir
                relativePath
              }
            }
          }
        }
      `,
    )
  ).data.allFile.edges[0].node;

  const ytChannels = JSON.parse(
    (
      await readFile(path.join(ytChannelsNode.dir, ytChannelsNode.relativePath))
    ).toString(),
  );
  const confChannelMap = {};

  for (const ytChannel of ytChannels) {
    const ytChannelPlaylist = JSON.parse(
      await readFile(path.join('data/playlist', ytChannel.name + '.json')),
    );

    // every ytChannelPlaylist is a conference at a particular time, ex: "React Europe 2019",
    // try to find out which "conference channel" (ex: "React Europ") it belongs to
    for (const confEvent of ytChannelPlaylist.items) {
      const matched = matchConferenceByTitle({
        title: confEvent.snippet.title,
        conferences: ytChannel.conferences,
      });

      if (matched) {
        if (!confChannelMap[matched.name]) {
          confChannelMap[matched.name] = {
            name: matched.name,
            display: matched.display,
            items: [],
          };
        }

        confChannelMap[matched.name].items.push(confEvent);
      }
    }
  }

  const baseContext = {
    ytChannels,
    channels: transformAllChannelsData(
      Object.keys(confChannelMap).map((key) => confChannelMap[key]),
    ),
  };

  createPage({
    path: `/`,
    component: path.resolve(`src/templates/LandingPage.js`),
    context: {
      ...baseContext,
      classicVideos: getMostViewed(10),
      trendingNowVideos: getRecentViewed(10),
      newReleasedVideos: getNewReleased(10),
    },
  });

  createPage({
    path: `/player`,
    component: path.resolve(`src/templates/PlayerPage.js`),
    context: baseContext,
  });

  createPage({
    path: `/favorites`,
    component: path.resolve(`src/templates/FavoritePage.js`),
    context: baseContext,
  });
};
