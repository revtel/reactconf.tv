// This file has been included both in build time and runtime.
// So we avoid using syntax such as optional channing, and export it with commonjs convention

function transformAllChannelsData(channels) {
  return channels.map((ch) => {
    return {
      name: ch.name,
      display: ch.display,
      items: ch.items.map((confEvent) => {
        return {
          id: confEvent.id,
          title: confEvent.snippet.title,
          thumbnail:
            confEvent.snippet.thumbnails.medium &&
            confEvent.snippet.thumbnails.medium.url,
          thumbnailStd:
            confEvent.snippet.thumbnails.standard &&
            confEvent.snippet.thumbnails.standard.url,
          totalCount: confEvent.contentDetails.itemCount,
          description: confEvent.snippet.description,
          publishedAt: confEvent.snippet.publishedAt,
          channelId: confEvent.snippet.channelId,
          channelTitle: confEvent.snippet.channelTitle,
        };
      }),
    };
  });
}

function transformConfEventData(confEvent) {
  return {
    ...confEvent,
    items: confEvent.items.map(transformConfTalkData),
  };
}

function transformConfTalkData(talk, idx) {
  return {
    idx,
    videoId: talk.snippet.resourceId.videoId,
    title: talk.snippet.title,
    thumbnail:
      talk.snippet.thumbnails.standard && talk.snippet.thumbnails.standard.url,
    description: talk.snippet.description,
    publishedAt: talk.snippet.publishedAt,
    channelId: talk.snippet.channelId,
    channelTitle: talk.snippet.channelTitle,
    playlistId: talk.snippet.playlistId,
  };
}

module.exports = {
  transformAllChannelsData,
  transformConfEventData,
  transformConfTalkData,
};
