const express = require('express');
const router = express.Router();
const UsuarioController = require('../../src/controller/usuarioController');

// GET 
router.get('/listar', UsuarioController.getAll);

router.post('/criar', UsuarioController.create);


module.exports = router;