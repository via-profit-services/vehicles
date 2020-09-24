/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const https = require('follow-redirects').https;
const uuidv4 = require('uuid').v4;

(async () => {


  const sourcefilename = path.resolve(__dirname, '../source/cars4.json');
  const downloadFiles = async () => new Promise((resolve, reject) => {
    try {
      const destinationFile = fs.createWriteStream(sourcefilename);
      https.get('https://raw.githubusercontent.com/blanzh/carsBase/master/cars4.json', (response) => {
        response.pipe(destinationFile);
        destinationFile.on('finish', () => {
          destinationFile.close();
          console.log(chalk.green('File downloaded successfully'));
          resolve();
        });
      });
    } catch (err) {
      console.log(chalk.red(`Failed to download file ${sourceFilename}`));
      console.error(err);
      reject();
    }
  })
  
  await downloadFiles();
  
  console.log(chalk.yellow('Parse file'));
  const list = JSON.parse(fs.readFileSync(sourcefilename, { encoding: 'utf8' }));

  Object.entries(list).forEach(([makeName, modelsList]) => {

    const makeDir = path.resolve(__dirname, '../src/vehicles', makeName);
    const modelsFile = path.resolve(__dirname, '../src/vehicles', makeName, 'models.json');
    const makesFile = path.resolve(__dirname, '../src/vehicles', makeName, 'makes.json');

    // create missing directories
    if (!fs.existsSync(makeDir)) {
      fs.mkdirSync(makeDir, { recursive: true });
    }

    if (!fs.existsSync(makesFile)) {
      const makeContent = [{
        id: uuidv4(),
        name: makeName,
      }];

      console.log(chalk.green(`Writed files for vehicle make «${makeName}»`));
      fs.writeFileSync(makesFile, JSON.stringify(makeContent), { encoding: 'utf8' });
    }

    const existsMakes = JSON.parse(fs.readFileSync(makesFile, { encoding: 'utf8' })) || [];


    // create models list if not exist
    if (!fs.existsSync(modelsFile)) {
      fs.writeFileSync(modelsFile, JSON.stringify([]), { encoding: 'utf8' });
    }

    const existsModels = JSON.parse(fs.readFileSync(modelsFile, { encoding: 'utf8' })) || [];

    modelsList.forEach((model) => {
      if (!existsModels.find((m) => m.model === model)) {
        existsModels.push({
          id: uuidv4(),
          name: model,
          make: existsMakes[0].id,
        });
      }
    })

    if (!modelsList.length) {
      existsModels.push({
        id: uuidv4(),
        name: makeName,
        make: existsMakes[0].id,
      });
    }

    // update models list
    fs.writeFileSync(modelsFile, JSON.stringify(existsModels), { encoding: 'utf8' });
  });

})();