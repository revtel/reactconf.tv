const fs = require('fs');
const util = require('util');
const path = require('path');
const fetch = require('node-fetch');
const dataSource = require('../data/data.json');
const {matchConferenceByTitle} = require('../src/utils/matchConferenceByTitle');

async function fetchChannelData(channel) {
  const writeFile = util.promisify(fs.writeFile);
  const apiKey = 'AIzaSyBJLChpvbusFt4k8b4SHRShSHTrZNUA9Q8';
  const maxResults = 100;
  const playlistPath = 'data/playlist';
  const playlistItemsPath = 'static/playlistitems';

  let url, resp, json;

  url = `https://www.googleapis.com/youtube/v3/playlists?part=id%2CcontentDetails%2Cplayer%2Csnippet%2Cstatus&channelId=${channel.channelId}&maxResults=${maxResults}&key=${apiKey}`;
  resp = await fetch(url, {
    headers: {
      Accept: 'application/json',
    },
  });

  json = await resp.json();

  await writeFile(
    path.join(playlistPath, `${channel.name}.json`),
    JSON.stringify(json, null, 2),
  );

  let cnt = 0;

  for (const item of json.items) {
    const conf = matchConferenceByTitle({
      title: item.snippet.title,
      conferences: channel.conferences,
    });

    if (!conf) {
      continue;
    }

    const playlistId = item.id;
    let itemsJson = null;

    url = `https://www.googleapis.com/youtube/v3/playlistItems?part=id%2CcontentDetails%2Csnippet%2Cstatus&maxResults=${maxResults}&playlistId=${playlistId}&key=${apiKey}`;

    resp = await fetch(url, {
      headers: {
        Accept: 'application/json',
      },
    });

    itemsJson = await resp.json();

    await writeFile(
      path.join(playlistItemsPath, `${playlistId}.json`),
      JSON.stringify(itemsJson, null, 2),
    );

    cnt++;
  }

  return cnt;
}

async function fetchAll() {
  for (const ch of dataSource.ytChannels) {
    const totalItems = await fetchChannelData(ch);
    console.log(ch.name, totalItems);
  }
}

module.exports = {fetchAll};
