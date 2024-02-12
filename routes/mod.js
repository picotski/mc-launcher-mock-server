const express = require('express');
const router = express.Router();
const path = require('path');

const { readJson, getFile } = require('../scripts/file_manager');

const MOD_PATH = path.join(__dirname, '../mods');

// Get list of all available mods
router.get('/', async (req, res) => {
  const data = await readJson('modlist.json');
  res.set('Content-Type', 'application/json');
  if (data) {
    res.send(data);
  } else {
    res.status(501).send({
      'error': 'Mod list not initialized',
      'status': 501
    });
  }
});

// Get individual mod
router.get('/:modName', async (req, res) => {
  // Get mod list
  const modListRaw = await readJson('modlist.json');
  if (!modListRaw) {
    res.set('Content-Type', 'application/json');
    res.status(501).send({
      'error': 'Mod list not initialized',
      'status': 501
    });
    return;
  }
  const modList = await JSON.parse(modListRaw);
  // Filter to get only mod names
  const modNames = modList.mods.map(mod => mod.full_name);
  const modName = req.params.modName;
  // Check if mod is part of the mod list
  if (modNames.some(mod => mod === modName)) {
    // Send mod data
    const mod = await getFile(MOD_PATH, modName);
    res.set('Content-Length', mod.length);
    res.write(mod, 'binary');
    res.end();
  } else {
    // Send error message
    res.set('Content-Type', 'application/json');
    res.status(403).send({
      'error': 'Mod does not exist',
      'status': 403
    });
  }
});

module.exports = router;