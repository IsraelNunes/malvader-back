//Rotas como /api/clientes para operações relacionadas a clientes.
const express = require('express');
const router = express.Router();
const ClienteController = require('../../src/controller/clienteController');

//GET router.get('/:id', ClienteController.getById);

// GET 
router.get('/listar', ClienteController.getAll)

router.post('/criar', ClienteController.create);

router.put('/alterar/:cpf', ClienteController.update);

router.delete('/deletar/:cpf', ClienteController.delete);

module.exports = router;