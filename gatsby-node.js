const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);
const templates = {
  landing: path.resolve(`src/templates/LandingPage.js`),
  player: path.resolve(`src/templates/PlayerPage.js`),
  favorites: path.resolve(`src/templates/FavoritePage.js`),
};

exports.createPages = async ({graphql, actions}) => {
  const {createPage} = actions;
  const resp = await graphql(
    `
      query MyQuery {
        allFile(filter: {name: {eq: "data"}}) {
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
  );

  const node = resp.data.allFile.edges[0].node;
  const rootConfig = JSON.parse(
    (await readFile(path.join(node.dir, node.relativePath))).toString(),
  );
  const confChannelMap = {};

  for (const ytChannel of rootConfig.ytChannels) {
    const ytChannelPlaylist = JSON.parse(
      await readFile(path.join('data/playlist', ytChannel.name + '.json')),
    );

    for (const confEvent of ytChannelPlaylist.items) {
      let matched = null;

      for (const conf of ytChannel.conferences) {
        for (const filter of conf.filters) {
          if (confEvent.snippet.title.indexOf(filter) > -1) {
            matched = conf;
            break;
          }
        }
        if (matched) {
          break;
        }
      }

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

  const confChannels = Object.keys(confChannelMap).map(
    (key) => confChannelMap[key],
  );

  createPage({
    path: `/`,
    component: templates.landing,
    context: {
      rootConfig,
      confChannels,
    },
  });

  createPage({
    path: `/player`,
    component: templates.player,
    context: {
      rootConfig,
    },
  });

  createPage({
    path: `/favorites`,
    component: templates.favorites,
    context: {
      rootConfig,
    },
  });
};
