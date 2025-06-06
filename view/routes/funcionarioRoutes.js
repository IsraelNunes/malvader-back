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
//router.put('/:id', FuncionarioController.update);

// DELETE 
//router.delete('/:id', FuncionarioController.delete);

module.exports = router;