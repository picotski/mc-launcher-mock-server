const JSZip = require('jszip');
const path = require('path');
const fs = require('fs');

const TreeNode = require('./treeNode');

const MC_PATH = path.join(__dirname, '../minecraft_files');


exports.generateZip = async () => {
  const zip = new JSZip();

  const fileStructure = new TreeNode(MC_PATH);
  fileStructure.buildTree();

  const wholeFolder = zip.folder(fileStructure.name);
  
  const generateLayer = async (zipInstance, folder, currentPath) => {
    for (const file of folder.children) {
      if (file.children.length > 0) {
        const newZipInstance = zipInstance.folder();
        generateLayer(newZipInstance, file, path.join(currentPath, file.name));
      } else {
        const fileContent = fs.readFileSync(file.path);
        zip.file(path.join(currentPath, file.name), fileContent);
      }
    }
  };

  await generateLayer(wholeFolder, fileStructure, fileStructure.name);

  const zipFile = await zip.generateNodeStream();
  return zipFile;
};