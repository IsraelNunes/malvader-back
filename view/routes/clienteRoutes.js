//Rotas como /api/clientes para operações relacionadas a clientes.
const express = require('express');
const router = express.Router();
const ClienteController = require('../../src/controller/clienteController');

//GET
router.get('/:id', ClienteController.getById);

// GET 
router.get('/', ClienteController.getAll)

// POST
router.post('/', ClienteController.create);

// PUT 
router.put('/:id', ClienteController.update);

// DELETE 
router.delete('/:id', ClienteController.delete);

module.exports = router;