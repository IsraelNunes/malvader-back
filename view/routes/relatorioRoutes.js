const express = require('express');
const router = express.Router();
const RelatorioController = require('../../src/controller/RelatorioController');

//GET
router.get('/:id', RelatorioController.getById);

// GET 
router.get('/', RelatorioController.getAll)

// POST
router.post('/', RelatorioController.create);

// PUT 
router.put('/:id', RelatorioController.update);

// DELETE 
router.delete('/:id', RelatorioController.delete);

module.exports = router;