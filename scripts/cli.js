const {program} = require('commander');
const chalk = require('chalk');
const log = console.log;
const fs = require('fs');
const {snapshot} = require('./snapshot');
const {fetchAll} = require('./fetch-data');

program.version('0.0.1');

program
  .command('snapshot')
  .description('create snapshot for current dataset')
  .action(async () => {
    log(chalk.green('CLI command: snapshot') + `\n`);
    await snapshot();
  });

program
  .command('fetch')
  .description('fetch data from youtube')
  .action(async () => {
    log(chalk.green('CLI command: fetch') + `\n`);
    await fetchAll();
  });

program.parse(process.argv);
