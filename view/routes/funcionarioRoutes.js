//Rotas como /api/funcionarios para operações dos funcionários (cadastro, login, etc.).
const express = require('express');
const router = express.Router();
const FuncionarioController = require('../../src/controller/funcionarioController');

//GET
//router.get('/:id', FuncionarioController.getById);

// GET 
router.get('/listar', FuncionarioController.getAll)

// POST
router.post('/criar', FuncionarioController.create);

// PUT 
router.put('/atualizar/:cpf', FuncionarioController.update);

// DELETE 
router.delete('/deletar/:cpf', FuncionarioController.delete);

module.exports = router;