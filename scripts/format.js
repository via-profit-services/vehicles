/* eslint-disable arrow-body-style */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/no-extraneous-dependencies */
const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');


const files = fs.readdirSync(path.resolve('./data'));

const formatCountry = async (brandName) => {
  return new Promise((resolve) => {
    let state = 0;
    const brandsFilename = `./data/${brandName}/brands.json`;
    const modelsFilename = `./data/${brandName}/models.json`;

    const brands = exec(`cat <<< $(jq . ${brandsFilename}) > ${brandsFilename}`);
    const models = exec(`cat <<< $(jq . ${modelsFilename}) > ${modelsFilename}`);

    const endEvent = () => {
      state += 1;
      if (state === 2) {
        console.log(`${brandName} formatted`);
        resolve();
      }
    }

    brands.on('exit', endEvent);
    models.on('exit', endEvent);
  });
};


const bootstrap = async () => {
  console.log('Start');
  await files.reduce(async (prev, current) => {
    await prev;
    await formatCountry(current);
  }, Promise.resolve());

  console.log('Finish');
};


bootstrap();