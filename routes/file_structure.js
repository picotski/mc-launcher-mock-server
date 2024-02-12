const express = require('express');
const path = require('path');
const TreeNode = require('../scripts/treeNode');
const { generateZip } = require('../scripts/zipmc');

const router = express.Router();

const MC_PATH = path.join(__dirname, '../minecraft_files/SAOFrance');

router.get('/', async (req, res) => {
  const fileStructure = new TreeNode(MC_PATH);
  fileStructure.buildTree();
  res.json(fileStructure);
});

router.get('/zip', async (req, res) => {
  const zipFile = await generateZip();
  res.set('Content-Length', zipFile.length);
  res.write(zipFile, 'binary');
  res.end();
});

module.exports = router;