function transformAllChannelsData(channels) {
  return channels.map((ch) => {
    return {
      name: ch.name,
      display: ch.display,
      items: ch.items.map((confEvent) => {
        return {
          id: confEvent.id,
          title: confEvent.snippet.title,
          thumbnail: confEvent.snippet.thumbnails.medium.url,
          totalCount: confEvent.contentDetails.itemCount,
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
      };
    }),
  };
}

export {transformAllChannelsData, transformConfEventData};
