const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const log = console.log;

function readJsonFile(filepath) {
  try {
    return JSON.parse(fs.readFileSync(filepath, 'utf-8'));
  } catch (ex) {
    log(chalk.red('ERROR: ') + 'fail to read ' + filepath);
    return null;
  }
}

async function snapshot() {
  log(chalk.gray('scanning static/playlistitems') + `\n`);

  const playlistPath = 'static/playlistitems';
  const playlists = fs.readdirSync(playlistPath);
  const snapshotJson = {};

  log('total ' + chalk.gray(`total ${playlists.length}`) + ' playlists');
  for (const fname of playlists) {
    const filepath = path.join(playlistPath, fname);
    const {items} = readJsonFile(filepath);
    for (let idx = 0; idx < items.length; idx++) {
      const video = items[idx];
      const {title, playlistId, publishedAt, thumbnails} = video.snippet;
      const {videoId} = video.contentDetails;
      const thumbnail = (thumbnails.high && thumbnails.high.url) || null;
      // TODO: need watch count
      snapshotJson[videoId] = {
        playlistId,
        idx,
        title,
        publishedAt,
        thumbnail,
        videoId,
      };
    }
  }

  const snapshotPath = 'static/snapshots';

  fs.writeFileSync(
    path.join(snapshotPath, `${new Date().getTime()}.json`),
    JSON.stringify(snapshotJson, null, 2),
  );
  return true;
}

module.exports = {
  snapshot,
};
