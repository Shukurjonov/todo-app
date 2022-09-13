const dotenv = require('dotenv');

dotenv.config({
  path: '.env',
  sample: '.env',
  allowEmptyValues: false,
});

module.exports = {
  APP: {
    PORT: process.env.APP_PORT,
    ENV: process.env.APP_ENV,
    SECRET: process.env.APP_SECRET,
    SESSION_TIMEOUT: process.env.SESSION_TIMEOUT,
  },

  DB: {
    url: process.env.DB_URL,
  }
}