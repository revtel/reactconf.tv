function matchConferenceByTitle({title, conferences}) {
  for (const conf of conferences) {
    for (const filter of conf.filters) {
      if (title.indexOf(filter) > -1) {
        return conf;
      }
    }
  }
  return null;
}

module.exports = {
  matchConferenceByTitle,
};
