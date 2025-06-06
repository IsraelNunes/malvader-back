const express = require('express');
const cors = require('cors');
const banco = require('./src/util/database'); // Sequelize
require('dotenv').config();

const app = express();
const PORT = 3000;
app.use(cors());
app.use(express.json());

const usuarioRoutes = require('./view/routes/usuarioRoutes');
app.use('/api/usuario', usuarioRoutes);

const clienteRoutes = require('./view/routes/clienteRoutes');
app.use('/api/cliente', clienteRoutes);

const funcionarioRoutes = require('./view/routes/funcionarioRoutes');
app.use('/api/funcionario', funcionarioRoutes);

app.get('/', (req, res) => {
    res.send('API Banco Rodando 🚀');
});

// Rotas não encontradas 
app.use((req, res) => {
    res.status(404).json({ message: 'Rota não encontrada' });
});

// Inicialização do servidor
app.listen(PORT, async () => {
  console.log(`Servidor rodando na porta ${PORT}`);

  try {
    await banco.authenticate(); // Testa a conexão com Sequelize
    console.log('Conexão com o banco realizada com sucesso!');
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
  }
});
