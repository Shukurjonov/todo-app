const path = require('path');

const cors = require('cors');
const helmet = require('helmet');
const express = require('express');
const moment = require('moment');
const { replaceAll, saveLog } = require('./utils/functions');

const { errorMessageHandler } = require('./utils/helper');

const app = express();


const todoRouter = require('./routes/todo');

app.use(cors());
app.use(helmet());
app.use(express.json({ limit: '10mb' }));

app.use('/api/todo', todoRouter);

app.use((err, req, res, next) => {
  saveLog(path.join(process.cwd(), 'logs', `${replaceAll(req._parsedUrl.pathname, '/', '_')}.txt`), `
    \n\n || ============================================================= ||
    Log Time: ${moment().format('DD.MM.YYYY hh:mm:ss')}
    || ===>   Req query: ${JSON.stringify(req.query)} 
    || ===>   Req params: ${JSON.stringify(req.params)} 
    || ===>   Req body: ${JSON.stringify(req.body)} 
    || ===>   Req method: ${req.method} 
    || ===>   Endpoint: ${req.originalUrl}
    || ===>   Error message: ${err.message}
  `)
  const error = errorMessageHandler(err.status, err.message);
  res.status(err.status || 500).send(error);
});

module.exports = {
  app
}