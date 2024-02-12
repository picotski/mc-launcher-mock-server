const zipdir = require('zip-dir');
const path = require('path');

const MC_PATH = path.join(__dirname, '../minecraft_files');


exports.generateZip = async () => {
  await zipdir(MC_PATH, { saveTo: path.join(__dirname, '../zip/minecraft.zip')});
};

(async () => {
  await this.generateZip();
})();