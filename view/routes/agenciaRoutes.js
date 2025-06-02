const express = require('express');
const router = express.Router();
const AgenciaController = require('../../src/controller/AgenciaController');

//GET
router.get('/:id', AgenciaController.getById);

// GET 
router.get('/', AgenciaController.getAll)

// POST
router.post('/', AgenciaController.create);

// PUT 
router.put('/:id', AgenciaController.update);

// DELETE 
router.delete('/:id', AgenciaController.delete);

module.exports = router;