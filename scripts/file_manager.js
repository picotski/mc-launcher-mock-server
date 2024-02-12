const fsp = require('fs/promises');
const path = require('path');

const JSON_PATH = '../json';

exports.readJson = async (fileName) => {
  try {
    const data = await fsp.readFile(path.join(__dirname, JSON_PATH, fileName));
    return data;
  } catch (err) {
    console.error(`Got an error trying to read the file: ${err.message}`);
  }
};

exports.getFile = async (pathFolder, fileName) => {
  try {
    const data = await fsp.readFile(path.join(pathFolder, fileName));
    return data;
  } catch (err) {
    console.error(`Got an error trying to read the file: ${err.message}`);
  }
};