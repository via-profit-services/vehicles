/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */

const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');

const files = fs.readdirSync(path.resolve('./src/vehicles'));
const formatVehicles = async (make) => new Promise((resolve) => {
    spawn('yarn', ['prettier', '--write', `./src/vehicles/${make}/makes.json`]);
    const ex = spawn('yarn', ['prettier', '--write', `./src/vehicles/${make}/models.json`]);
    ex.on('exit', () => {
      resolve();
      console.log(chalk.yellow(`${make} was formatted`));
    });
  });
const bootstrap = async () => {
  console.log(chalk.yellow('Start'));
  await files.reduce(async (prev, current) => {
    await prev;
    await formatVehicles(current);
  }, Promise.resolve());
  console.log(chalk.green('Finish'));
};
bootstrap();
