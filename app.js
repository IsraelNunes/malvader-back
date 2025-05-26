const express = require('express');
const cors = require('cors');
const banco = require('./src/util/database');
require('dotenv').config(); //.env
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Banco Rodando 🚀');
});

//Rotas não encontradas 
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

//Inicialização do servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
  // Testar a conexão com o banco no startup
  banco.getConnection((err, connection) => {
    if (err) {
      console.error('Erro ao conectar no banco:', err);
    } else {
      console.log('Conexão com o banco realizada com sucesso!');
      connection.release();
    }
  });
});