/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-console */
/* eslint-disable camelcase */
/* eslint-disable import/no-extraneous-dependencies */
const fs = require('fs');
const path = require('path');
const glob = require("glob");

const vehicleMakesList = [];
const vehicleModelsList = [];
glob("./src/vehicles/*", {}, (er, files) => {
  files.forEach((dir) => {
    const makesFile = path.resolve(dir, 'makes.json');
    const modelsFile = path.resolve(dir, 'models.json');

    const makesList = JSON.parse(fs.readFileSync(makesFile, { encoding: 'utf8' }));
    const modelsList = JSON.parse(fs.readFileSync(modelsFile, { encoding: 'utf8' }));


    makesList.forEach((data) => {
      vehicleMakesList.push(data);
    })

    modelsList.forEach((data) => {
      vehicleModelsList.push(data);
    });

  });

  const exportedMakesFilename = path.resolve(__dirname, '../dist/vehicles/makes.json');
  const exportedModelsFilename = path.resolve(__dirname, '../dist/vehicles/models.json');

  if (!fs.existsSync(path.dirname(exportedMakesFilename))) {
    fs.mkdirSync(path.dirname(exportedMakesFilename), { recursive: true })
  }

  fs.writeFileSync(exportedMakesFilename, JSON.stringify(vehicleMakesList), { encoding: 'utf8' });
  fs.writeFileSync(exportedModelsFilename, JSON.stringify(vehicleModelsList), { encoding: 'utf8' });


  const indexDTs = `
import makes from './makes.json';
import models from './models.json';

export { makes, models };
`;

  const indexJs = `
const makes = require('./makes.json');
const models = require('./models.json');

module.exports = {
  makes,
  models,
};
`;

  fs.writeFileSync(path.resolve(__dirname, '../dist/vehicles/index.d.ts'), indexDTs);
  fs.writeFileSync(path.resolve(__dirname, '../dist/vehicles/index.js'), indexJs);
});