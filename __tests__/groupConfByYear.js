import groupConfByYears from '../src/utils/groupConfByYear';

test('groupConfByYear', () => {
  const output = groupConfByYears(testData);
  expect(output.find((byYear) => byYear.year === '2019').items.length).toBe(3);
});

const testData = [
  {
    items: [
      {
        title: 'Conf1 2019',
      },
    ],
  },
  {
    items: [
      {
        title: 'Conf2 2019',
      },
    ],
  },
  {
    items: [
      {
        title: 'Conf3 2019',
      },
    ],
  },
];
