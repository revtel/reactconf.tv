export default function groupConfByYear(channels) {
  return ['2020', '2019', '2018', '2017', '2016', '2015'].map((yearLabel) => {
    const items = [];
    for (const channel of channels) {
      for (const item of channel.items) {
        if (item.title.indexOf(yearLabel) > -1) {
          items.push({
            channel,
            ...item,
          });
        }
      }
    }

    return {
      year: yearLabel,
      items,
    };
  });
}
