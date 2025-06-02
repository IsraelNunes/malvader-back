//Rotas como /api/contas para criar contas, sacar, depositar, transferir, etc.
const express = require('express');
const router = express.Router();
const ContaController = require('../../src/controller/contaController');

//GET
router.get('/:id', ContaController.getById);

// GET 
router.get('/', ContaController.getAll)

// POST
router.post('/', ContaController.create);

// PUT 
router.put('/:id', ContaController.update);

// DELETE 
router.delete('/:id', ContaController.delete);

module.exports = router;