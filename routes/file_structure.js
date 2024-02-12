const express = require('express');
const path = require('path');
const TreeNode = require('../scripts/treeNode');
const { getFile } = require('../scripts/file_manager');

const router = express.Router();

const MC_PATH = path.join(__dirname, '../minecraft_files');
const ZIP_PATH = path.join(__dirname, '../zip');

router.get('/', async (req, res) => {
  const fileStructure = new TreeNode(MC_PATH);
  fileStructure.buildTree();
  res.status(200).json(fileStructure);
});

router.get('/:zip_name', async (req, res) => {
  if (req.params.zip_name === 'minecraft.zip') {
    const zipFile = await getFile(ZIP_PATH, 'minecraft.zip');
    res.set('Content-Length', zipFile.length);
    res.write(zipFile, 'binary');
    res.end();
  } else {
    res.status(400).json({error: 'zip does not exists'});
  }
});

module.exports = router;