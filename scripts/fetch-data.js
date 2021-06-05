const fs = require('fs');
const util = require('util');
const path = require('path');
const fetch = require('node-fetch');
const ytChannels = require('../data/ytChannels.json');
const {matchConferenceByTitle} = require('../src/utils/matchConferenceByTitle');

async function fetchAllChannels() {
  const apiKey = 'AIzaSyBJLChpvbusFt4k8b4SHRShSHTrZNUA9Q8';
  const maxResults = 100;
  let totalCnt = 0;
  for (const ch of ytChannels) {
    const cnt = await fetchOneChannel(ch, {apiKey, maxResults});
    console.log(ch.name, cnt);
    totalCnt += cnt;
  }
  console.log(`\nTotal: ${totalCnt}`);
}

async function fetchOneChannel(channel, {apiKey, maxResults}) {
  const writeFile = util.promisify(fs.writeFile);
  const playlistPath = 'data/playlist';
  const playlistItemsPath = 'static/playlistitems';

  async function fetchToJson(url) {
    return (
      await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
      })
    ).json();
  }

  const playlists = await fetchToJson(
    `https://www.googleapis.com/youtube/v3/playlists?part=id%2CcontentDetails%2Cplayer%2Csnippet%2Cstatus&channelId=${channel.channelId}&maxResults=${maxResults}&key=${apiKey}`,
  );

  await writeFile(
    path.join(playlistPath, `${channel.name}.json`),
    JSON.stringify(playlists, null, 2),
  );

  let cnt = 0;

  for (const playlist of playlists.items) {
    const conf = matchConferenceByTitle({
      title: playlist.snippet.title,
      conferences: channel.conferences,
    });

    if (!conf) {
      continue;
    }

    const itemsJson = await fetchToJson(
      `https://www.googleapis.com/youtube/v3/playlistItems?part=id%2CcontentDetails%2Csnippet%2Cstatus&maxResults=${maxResults}&playlistId=${playlist.id}&key=${apiKey}`,
    );

    await writeFile(
      path.join(playlistItemsPath, `${playlist.id}.json`),
      JSON.stringify(itemsJson, null, 2),
    );

    cnt++;
  }

  return cnt;
}

module.exports = {fetchAllChannels};
