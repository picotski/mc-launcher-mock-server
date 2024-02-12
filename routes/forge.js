const express = require('express');
const router = express.Router();
const path = require('path');

const { readJson, getFile } = require('../scripts/file_manager');

const FORGE_PATH = path.join(__dirname, '../forge');

// Get info about forge
router.get('/', async (req, res) => {
  const data = await readJson('forge_info.json');
  res.set('Content-Type', 'application/json');
  if (data) {
    res.status(200).send(data);
  } else {
    res.status(501).send({
      'error': 'Forge not initialized',
      'status': 501
    });
  }
});

// Get forge file
router.get('/:forgeName', async (req, res) => {
  // Get forge info
  const forgeRaw = await readJson('forge_info.json');
  if (!forgeRaw) {
    res.set('Content-Type', 'application/json');
    res.status(501).send({
      'error': 'Forge not initialized',
      'status': 501
    });
    return;
  }
  const forge = await JSON.parse(forgeRaw);
  const forgeName = req.params.forgeName;
  // Check if forge name match current forge file
  if (forge.full_name === forgeName) {
    // Send forge data
    const forgeFile = await getFile(FORGE_PATH, forgeName);
    res.set('Content-Length', forgeFile.length);
    res.write(forgeFile, 'binary');
    res.end();
  } else {
    // Send error message
    res.set('Content-Type', 'application/json');
    res.status(403).send({
      'error': 'Forge version does not exist',
      'status': 403
    });
  }
});

module.exports = router;