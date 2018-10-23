/* eslint-disable no-console */
const express = require('express');
const request = require('request');
const cors = require('cors');

const app = express();
app.use(cors());

app.use('/proxy/', (req, res) => {
  const url = `https://visningsrom.stacc.com/dd_server_worms/rest${req.url}`;
  console.log(`Piping through request: ${url} \n`);

  req.pipe(request(url)).pipe(res);
});

app.listen(5000, () => console.log('Listening on port 5000'));
