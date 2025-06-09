const jwt = require('jsonwebtoken');
require('dotenv').config();

function gerarToken(payload, tempoExpiracao = '1h') {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: tempoExpiracao,
  });
}

module.exports = gerarToken;