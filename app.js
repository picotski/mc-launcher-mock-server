const express = require('express');
const mod = require('./routes/mod');
const forge = require('./routes/forge');
const files = require('./routes/file_structure');

const app = express();
const PORT = 3002;

app.listen(PORT, (err) => {
  if (!err) {
    console.log('Server is running on port ' + PORT);
  } else {
    console.log('Error occurred, server can\'t start', err);
  }
});

app.get('/', (req, res) => {
  res.set('Content-Type', 'application/json');
  res.send('Server ON');
});

app.use('/mods', mod);
app.use('/forge', forge);
app.use('/files', files);