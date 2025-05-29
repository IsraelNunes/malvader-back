const gerarToken = require('../src/util/gerarToken');

// Exemplo de payload: dados do usuário autenticado
const payload = {
  id: 1,
  nome: 'João da Silva',
  role: 'admin'
};

const token = gerarToken(payload);
console.log('Token JWT gerado:', token);
