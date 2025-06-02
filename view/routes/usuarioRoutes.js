const express = require('express');
const router = express.Router();
const UsuarioController = require('../../src/controller/UsuarioController');

//GET
router.get('/:id', UsuarioController.getById);

// GET 
router.get('/', UsuarioController.getAll)

// POST
router.post('/', UsuarioController.create);

// PUT 
router.put('/:id', UsuarioController.update);

// DELETE 
router.delete('/:id', UsuarioController.delete);

module.exports = router;