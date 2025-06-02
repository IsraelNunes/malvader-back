const express = require('express');
const router = express.Router();
const TransacaoController = require('../../src/controller/TransacaoController');

//GET
router.get('/:id', TransacaoController.getById);

// GET 
router.get('/', TransacaoController.getAll)

// POST
router.post('/', TransacaoController.create);

// PUT 
router.put('/:id', TransacaoController.update);

// DELETE 
router.delete('/:id', TransacaoController.delete);

module.exports = router;