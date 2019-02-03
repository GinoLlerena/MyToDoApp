
import express from 'express';
var bodyParser = require('body-parser');

import status from './router/status'


var app = express();

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies


const port = process.env.PORT || 9001;
const PROD = process.env.NODE_ENV === 'production';


if (PROD) {
  app.use('/', express.static('dist'));
}


app.use('/api/status', status);

app.listen(port, () => {
  if (PROD) {
    console.log(`\n\n\n🚀  Server running at http://localhost:${port}.\n\n\n`);
  } else {
    console.log(`\n\n\n🚀  Server running at http://localhost:9001.\n\n\n`);
  }
})