import {
  transformAllChannelsData,
  transformConfEventData,
} from '../src/utils/transformData';

describe('transformData', () => {
  test('transformAllChannelsData', () => {
    expect(transformAllChannelsData(testChannelsData)).toEqual([
      {
        name: 'test-conf',
        display: 'Test Conf',
        items: [
          {
            id: 'PLPxbbTqCLbGHPxZpw4xj_Wwg8-fdNxJRh',
            title: 'React Conf 2019',
            thumbnail: 'https://i.ytimg.com/vi/QnZHO7QvjaM/mqdefault.jpg',
            totalCount: 27,
          },
        ],
      },
    ]);
  });

  test('transformConfEventData', () => {
    expect(transformConfEventData(testConfEventData).items).toEqual([
      {
        videoId: 'WjJdaDXN5Vs',
        title:
          'Jonas Gebhardt - Evolving the Visual Programming Environment with React at react-europe 2016',
        thumbnail: 'https://i.ytimg.com/vi/WjJdaDXN5Vs/sddefault.jpg',
      },
    ]);
  });
});

const testChannelsData = [
  {
    name: 'test-conf',
    display: 'Test Conf',
    items: [
      {
        kind: 'youtube#playlist',
        etag: 'COaHLf9_ZEYF3nuqye2__5-EdR8',
        id: 'PLPxbbTqCLbGHPxZpw4xj_Wwg8-fdNxJRh',
        snippet: {
          publishedAt: '2019-10-31T01:42:43Z',
          channelId: 'UCz5vTaEhvh7dOHEyd1efcaQ',
          title: 'React Conf 2019',
          description: '',
          thumbnails: {
            default: {
              url: 'https://i.ytimg.com/vi/QnZHO7QvjaM/default.jpg',
              width: 120,
              height: 90,
            },
            medium: {
              url: 'https://i.ytimg.com/vi/QnZHO7QvjaM/mqdefault.jpg',
              width: 320,
              height: 180,
            },
            high: {
              url: 'https://i.ytimg.com/vi/QnZHO7QvjaM/hqdefault.jpg',
              width: 480,
              height: 360,
            },
            standard: {
              url: 'https://i.ytimg.com/vi/QnZHO7QvjaM/sddefault.jpg',
              width: 640,
              height: 480,
            },
            maxres: {
              url: 'https://i.ytimg.com/vi/QnZHO7QvjaM/maxresdefault.jpg',
              width: 1280,
              height: 720,
            },
          },
          channelTitle: 'React Conf',
        },
        contentDetails: {
          itemCount: 27,
        },
      },
    ],
  },
];

const testConfEventData = {
  items: [
    {
      id:
        'UExDQzQzNkpwVm5LMExUREtXM09fQkdUWm5yWjhkQkFvZi41NkI0NEY2RDEwNTU3Q0M2',
      snippet: {
        publishedAt: '2016-06-05T09:44:59Z',
        channelId: 'UCorlLn2oZfgOJ-FUcF2eZ1A',
        title:
          'Jonas Gebhardt - Evolving the Visual Programming Environment with React at react-europe 2016',
        description:
          'Tools shape our thinking. The "React Way" of thinking has already found many applications beyond building user interfaces. Particularly, React\'s functional, component-based design makes it an ideal candidate for building a better Visual Programming Environment. We\'ll examine how to overcome challenges such as lack of standardized APIs and limits of composition, and show how we can drastically improve the way humans create digital artifacts today.',
        thumbnails: {
          default: {
            url: 'https://i.ytimg.com/vi/WjJdaDXN5Vs/default.jpg',
            width: 120,
            height: 90,
          },
          medium: {
            url: 'https://i.ytimg.com/vi/WjJdaDXN5Vs/mqdefault.jpg',
            width: 320,
            height: 180,
          },
          high: {
            url: 'https://i.ytimg.com/vi/WjJdaDXN5Vs/hqdefault.jpg',
            width: 480,
            height: 360,
          },
          standard: {
            url: 'https://i.ytimg.com/vi/WjJdaDXN5Vs/sddefault.jpg',
            width: 640,
            height: 480,
          },
          maxres: {
            url: 'https://i.ytimg.com/vi/WjJdaDXN5Vs/maxresdefault.jpg',
            width: 1280,
            height: 720,
          },
        },
        channelTitle: 'ReactEurope',
        playlistId: 'PLCC436JpVnK0LTDKW3O_BGTZnrZ8dBAof',
        position: 0,
        resourceId: {
          kind: 'youtube#video',
          videoId: 'WjJdaDXN5Vs',
        },
      },
      contentDetails: {
        videoId: 'WjJdaDXN5Vs',
        videoPublishedAt: '2016-06-06T08:13:50Z',
      },
    },
  ],
};
