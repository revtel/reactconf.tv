const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const fetch = require('node-fetch');
const log = console.log;
const playlistPath = 'static/playlistitems';
const snapshotPath = 'static/snapshots';

function readJsonFile(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch (ex) {
    log(chalk.red('ERROR: ') + 'fail to read ' + filepath);
    return null;
  }
}

async function fetchViewStats(videoIdList) {
  const apiKey = 'AIzaSyBJLChpvbusFt4k8b4SHRShSHTrZNUA9Q8';
  const statsResp = await fetch(
    `https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${videoIdList.join(
      ',',
    )}&key=${apiKey}&maxResults=100`,
    {
      header: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    },
  );

  return statsResp.json();
}

async function snapshot() {
  log(chalk.gray('scanning static/playlistitems') + `\n`);

  const playlists = fs.readdirSync(playlistPath);
  const snapshotJson = {};

  log('total ' + chalk.gray(`total ${playlists.length}`) + ' playlists');
  for (const fname of playlists) {
    log('processing ' + chalk.gray(fname));

    const filepath = path.join(playlistPath, fname);
    const {items} = readJsonFile(filepath);
    const videoIdList = [];

    for (let idx = 0; idx < items.length; idx++) {
      const video = items[idx];
      const {title, playlistId, publishedAt, thumbnails} = video.snippet;
      const {videoId} = video.contentDetails;
      const thumbnail = (thumbnails.high && thumbnails.high.url) || null;
      snapshotJson[videoId] = {
        playlistId,
        idx,
        title,
        publishedAt,
        thumbnail,
        videoId,
      };
      videoIdList.push(videoId);
    }

    const statsRespJson = await fetchViewStats(videoIdList);

    for (const item of statsRespJson.items) {
      snapshotJson[item.id].stats = item.statistics;
    }
  }

  fs.writeFileSync(
    path.join(snapshotPath, `${new Date().getTime()}.json`),
    JSON.stringify(snapshotJson, null, 2),
  );

  log(chalk.green('Done'));
  return true;
}

module.exports = {
  snapshot,
};
