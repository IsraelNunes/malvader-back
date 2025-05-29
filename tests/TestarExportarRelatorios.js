const { exportarParaExcel, exportarParaPDF } = require('../src/util/exportarRelatorios');

// Exemplo de dados fictícios
const dados = [
  { id: 1, nome: 'João', saldo: 1500 },
  { id: 2, nome: 'Maria', saldo: 2300 },
  { id: 3, nome: 'Carlos', saldo: 3400 },
];

// Chama exportação para Excel
exportarParaExcel(dados, 'RelatorioClientes');

// Chama exportação para PDF
exportarParaPDF(dados, 'RelatorioClientes');
