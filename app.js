const express = require('express');
const cors = require('cors');
const app = express();

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
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
