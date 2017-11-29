const fse = require("fs-extra");


// Stores configuration information about the server
module.exports = {
  SECRET:       'li3',
  TOKENSECRET:  'li3-t0-m3',
  SESSION:      'lie-sess-id',
  MONGODB_URI:  'mongodb://localhost:27017/LieDetect',
  PORT:         3000,
  HTTPS: {
    key:          fse.readFileSync('./security/key.pem'),
    cert:         fse.readFileSync('./security/cert.pem')
  }
};
