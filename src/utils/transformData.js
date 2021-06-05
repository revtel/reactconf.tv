function transformAllChannelsData(channels) {
  return channels.map((ch) => {
    return {
      name: ch.name,
      display: ch.display,
      items: ch.items.map((confEvent) => {
        return {
          id: confEvent.id,
          title: confEvent.snippet.title,
          thumbnail: confEvent.snippet.thumbnails.medium?.url,
          thumbnailStd: confEvent.snippet.thumbnails.standard?.url,
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
    items: confEvent.items.map((talk) => {
      return {
        videoId: talk.snippet.resourceId.videoId,
        title: talk.snippet.title,
        thumbnail: talk.snippet.thumbnails.standard?.url,
        description: talk.snippet.description,
        publishedAt: talk.snippet.publishedAt,
        channelId: talk.snippet.channelId,
        channelTitle: talk.snippet.channelTitle,
      };
    }),
  };
}

export {transformAllChannelsData, transformConfEventData};
